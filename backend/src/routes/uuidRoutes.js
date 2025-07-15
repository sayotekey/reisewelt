import express from "express";
// v4 ist die am häufigsten verwendete Variante - generiert eine 128-Bit UUID
import { v4 as uuidv4 } from "uuid"; // für eindeutige IDs
import UuidModel from "../models/uuidModel.js";
import { getAccessToken, fetchFromAmadeus } from "../api/amadeusService.js";

const router = express.Router();

const cityNameToCode = {
  Aberdeen: "ABZ",
  Algeciras: "AEI",
  Amsterdam: "AMS",
  Antwerpen: "ANR",
  Barcelona: "BCN",
  Berlin: "BER",
  Bologna: "BLQ",
  Brüssel: "BRU",
  Coruna: "LCG",
  Dublin: "DUB",
  Dundee: "DND",
  Düsseldorf: "DUS",
  Edinburgh: "EDI",
  Frankfurt: "FRA",
  Genf: "GVA",
  Glasgow: "GLA",
  Granada: "GRX",
  Graz: "GRZ",
  Hamburg: "HAM",
  Innsbruck: "INN",
  Inverness: "INV",
  Kopenhagen: "CPH",
  Klagenfurt: "KLU",
  Köln: "CGN",
  Leipzig: "LEJ",
  Linz: "LNZ",
  Lissabon: "LIS",
  London: "LON",
  Lyon: "LYS",
  Madrid: "MAD",
  Malaga_Costa_del_Sol: "AGP",
  Mailand_Malpensa: "MXP",
  Mailand_Linate: "LIN",
  Marseille: "MRS",
  München: "MUC",
  Nizza: "NCE",
  Oslo: "OSL",
  Palma: "PMI",
  Paris: "PAR",
  Pisa: "PSA",
  Porto: "OPO",
  Rom: "ROM",
  Salzburg: "SZG",
  Sevilla: "SVQ",
  Stockholm: "STO",
  Stuttgart: "STR",
  Toulouse: "TLS",
  Valencia: "VLC",
  Wien: "VIE",
  Zürich: "ZRH",

  // ...weitere Städte
};

// erster Entpunkt:
// Generierung einer eindeutigen UUID und Rückgabe ins Frontend
// speichern von abgerufenen Amadeus-API-Daten unter dieser UUID in der Mongo-Datenbank
router.get("/generate", async (req, res) => {
  const uniqueId = uuidv4();

  try {
    const newUuid = new UuidModel({ uuid: uniqueId, flag: false });
    await newUuid.save();
    console.log("UUID saved successfully:", uniqueId);
  } catch (error) {
    console.error("Error saving UUID:", error);
    res.status(500).json({ error: "Error saving UUID" });
  }
  console.log("Generated UUID:", uniqueId);
  res.status(200).json({ uuid: uniqueId }); // für das Frontend

  try {
    const { cityName } = req.query; // Städtenamen auslesen
    console.log("Received cityName:", cityName);

    // CityCode suchen
    const cityCode = cityNameToCode[cityName];
    if (!cityCode) {
      return res.status(400).json({ message: "Unbekannter Städtename" });
    }
    const token = await getAccessToken(); // access token holen

    // Anfrage an verschiedene Amadeus-Endpunkte
    // später=>  Promiss all einbauen für abfrage von rating und geocode!!

    const hotelsbyCity = await fetchFromAmadeus(
      `/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      token
    ); // alle Hotels by Citycode

    const hotelIdList = hotelsbyCity.data.map((hotel) => ({
      hotelIds: hotel.hotelId, // holt aus Amadeus-Anfrage Nr. 1 alle HotelIds fuer die spaetere Verwendung (=> 2.Anfrage fuer Offers)
    }));
    console.log("hotelIdList-Length", hotelIdList.length);

    let countList = 0;
    for (let i = 0; i < hotelIdList.length; i++) {
      console.log("Frage Hotel-ID an:", hotelIdList[i]); // Ausgabe im Terminal zur Kontrolle
      console.log("i=", i);

      const result = await fetchFromAmadeus(
        `/v3/shopping/hotel-offers?hotelIds=${hotelIdList[i].hotelIds}`,
        token
      ); // alle Hotelangebote für die jeweilige Hotel-ID

      if (
        // Pruefen, ob es Angebote mit available: true gibt
        result &&
        result.data &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        // Füge die gefundenen Hotels zur bestehenden Liste hinzu (statt zu überschreiben)
        await UuidModel.findOneAndUpdate(
          { uuid: uniqueId },
          { $addToSet: { hotels: { $each: result.data } } }
        );
        countList++;
        console.log("Angebote gefunden für Hotel-ID:", hotelIdList[i].hotelIds);
        console.log(`${result.data} wurde in Mongo DB gespeichert`);
        if (countList === 5) {
          await UuidModel.findOneAndUpdate(
            { uuid: uniqueId },
            { $set: { flag: true } }
          );
          console.log("5 Angebote gefunden");
          break;
        } else if (i === hotelIdList.length) {
          // else if (countList < 5 && countList === hotelIdList.length) {

          await UuidModel.findOneAndUpdate(
            { uuid: uniqueId },
            { $set: { flag: true } }
          );
          console.log("Liste fertig, keine weiteren Angebote verfügbar");
          break;
        }
      }
      // else {
      //   console.log("No offers found for hotelId:", hotelIdList[i].hotelIds);
      // }
    }
  } catch (error) {
    console.error("Error fetching hotel data:", error);
  }
});

// zweiter Endpunkt:
// Abfrage der Anzahl der Hotels, die unter dieser UUID gespeichert sind
// und Rückgabe der Anzahl ins Frontend
// URL: http://localhost:3000/api/uuid/status/:uuid
router.get("/status/:uuid", async (req, res) => {
  const { uuid } = req.params;
  console.log("uuid-backend-ep-zwei:", uuid);

  try {
    const eintrag = await UuidModel.findOne({ uuid: uuid }).exec();

    if (!eintrag || !Array.isArray(eintrag.hotels)) {
      return res.json({ count: 0, message: "Noch keinen Eintrag gefunden" });
    }
    console.log("mongo-db-eintrag-length", eintrag.hotels.length); // gibt Int/Number zurück
    res.json({ count: eintrag.hotels.length }); // rückgabe an Frontend
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;

// dritter Ednpunkt:
// Abfrage der Hotels, die unter dieser UUID gespeichert sind
// und Rückgabe der Hotels ins Frontend

router.get("/hotels/:uuid", async (req, res) => {
  const { count } = req.params; //vorher query
  const { uuid } = req.params;
  console.log("uuid:", uuid);
  console.log("Count:", count);
  try {
    const countNum = count ? parseInt(count, 10) : null;
    console.log("Parsed count:", countNum);
    if (countNum > 0) {
      const eintrag = await UuidModel.findOne({ uuid: uuid }).exec();
      if (eintrag && Array.isArray(eintrag.hotels)) {
        const hotels = eintrag.hotels.slice(0, countNum);
        console.log(hotels);
        res.json({ hotels });
      } else {
        res.status(404).json({ message: "No hotels found for this UUID" });
      }
    } else if (count === undefined) {
      // If count is not provided, return all hotels
      const eintrag = await UuidModel.findOne({ uuid: uuid }).exec();
      if (eintrag && Array.isArray(eintrag.hotels)) {
        console.log(eintrag.hotels);
        res.json({ hotels: eintrag.hotels });
      } else {
        res.status(404).json({ message: "No hotels found for this UUID" });
      }
    } else {
      res.status(400).json({ message: "Invalid count parameter" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
