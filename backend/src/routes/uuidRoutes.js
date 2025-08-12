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
  console.log("mock:", req.query.mock);

  // const mockParam = req.query.mock?.toLowerCase();
  const mockParam = req.query.mock.toLowerCase();

  // Feste UUIDs für Mocking  in MongoDB
  const mockUuidsByCity = {
    nizza: "bb18da18-6e0a-4915-ad78-716d66dbca21",
    berlin: "63bb4692-2d23-4aa1-b20b-7286df7c7596",
    //   genf: "4b310ba6-e3d2-4726-83f1-ac2631954b02",
    //   kopenhagen: "9b9b3d97-76d0-43eb-a3d8-820942871cc3",
  };

  // Wenn ein Mock-Parameter gesetzt ist, gib passende UUID zurück
  if (mockParam && mockUuidsByCity[mockParam]) {
    const mockUuid = mockUuidsByCity[mockParam];
    console.log(`Mock-UUID-Modus aktiv (${mockParam}) – sende:`, mockUuid);
    return res.status(200).json({ uuid: mockUuid });
  } else {
    const uniqueId = uuidv4();
    //
    try {
      const newUuid = new UuidModel({ uuid: uniqueId, flag: false }); //amadeus
      // const newUuid = new UuidModel({ uuid: uniqueId }); //mock
      // const newUuid = new UuidModel({ uuid: uniqueId, flag: false, hotels: [] });
      await newUuid.save();
      console.log("UUID saved successfully:", uniqueId);
    } catch (error) {
      console.error("Error saving UUID:", error);
      res.status(500).json({ error: "Error saving UUID" });
    }
    console.log("Generated UUID:", uniqueId);
    res.status(200).json({ uuid: uniqueId }); // für das Frontend

    try {
      ///
      const { cityName, startDate, endDate, adults, children } = req.query;
      function formatDate(date) {
        return (
          date.getFullYear() +
          "-" +
          String(date.getMonth() + 1).padStart(2, "0") +
          "-" +
          String(date.getDate()).padStart(2, "0")
        );
      }
      const startDateObj = new Date(startDate);
      const endDateObj = new Date(endDate);
      const startDateFormatted = formatDate(startDateObj); // "2025-07-19"
      const endDateFormatted = formatDate(endDateObj);

      // Kinder sind API-Pay-Option
      const combinedTravellers = Number(adults) + Number(children);
      ///
      console.log("Received cityName:", cityName);
      console.log("startDate", startDate);
      console.log("typeof startDate", typeof startDate); //string
      console.log("endDate", endDate);
      console.log("startDateFormatted", startDateFormatted);
      console.log("endDateFormatted", endDateFormatted);
      console.log("adults", adults);
      console.log("travellers", combinedTravellers);

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

      ///neue logik für 10citycodes bei multioffers amadeus abfrage
      /*
    eine flache kopie von hotelIDList machen
    for schleife mit hotelidList.length
    mit splice() immer 10 ausschneiden und an die amadeus url hängen
    oder: als parameter mitgeben?
    multioffers-pfad sollte schneller ein ergebnis schicken als 10 einzelne abfragen
    ergebnis => auf available true prüfen => falls true in mongo db speichern
    dann die nächsten 10 hotelids ausschneiden und prüfen
    */
      let newCountList = 0;
      const newHotelIdList = [...hotelIdList];
      while (newHotelIdList.length > 0) {
        // Schneide die nächsten 10 Hotel-IDs aus dem Array heraus
        const batch = newHotelIdList
          .splice(0, 50)
          .map((h) => h.hotelIds)
          .join(",");
        console.log("Frage Hotel-IDs an:", batch);

        const result = await fetchFromAmadeus(
          `/v3/shopping/hotel-offers?hotelIds=${batch}&checkInDate=${startDateFormatted}&checkOutDate=${endDateFormatted}&adults=${combinedTravellers}`,
          // `/v3/shopping/hotel-offers?hotelIds=${batch}`,
          token
        );

        if (
          result &&
          result.data &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          // Nur Hotels mit available: true speichern (optional, je nach API-Response)
          const availableHotels = result.data.filter(
            (hotel) => hotel.available === true
          );
          if (availableHotels.length > 0) {
            await UuidModel.findOneAndUpdate(
              { uuid: uniqueId },
              { $addToSet: { hotels: { $each: availableHotels } } }
            );
            newCountList += availableHotels.length;
            console.log(
              `${availableHotels.length} Angebote in Mongo DB gespeichert`
            );
            // Optional: Abbruch nach 5 gefundenen Hotels
            if (newCountList >= 5) {
              await UuidModel.findOneAndUpdate(
                { uuid: uniqueId },
                { flag: true }
              );
              console.log("5 Angebote gefunden");
              break;
            }
          }
        }
        // Wenn keine weiteren Hotels mehr übrig sind, flag setzen
        if (newHotelIdList.length === 0) {
          await UuidModel.findOneAndUpdate({ uuid: uniqueId }, { flag: true });
          console.log("Liste fertig, keine weiteren Angebote verfügbar");
          break;
        }
      }
      ///
    } catch (error) {
      console.error("Error fetching hotel data:", error);
    }
  }
});

// 2. Endpunkt:
// Abfrage der Anzahl der Hotels, die unter dieser UUID gespeichert sind
// und Rückgabe der Anzahl ins Frontend
// URL: http://localhost:3000/api/uuid/status/:uuid
router.get("/status/:uuid", async (req, res) => {
  const { uuid } = req.params;
  console.log("uuid-backend-endpunkt-zwei:", uuid);

  let responded = false;

  //Timeout 40sek
  const timeout = setTimeout(() => {
    if (!responded) {
      responded = true;
      return res
        .status(404)
        .json({ message: "Run Time Error - Keine Eintraege gefunden!" });
    }
  }, 40000);

  try {
    const eintrag = await UuidModel.findOne({ uuid: uuid }).exec();

    if (!eintrag || !Array.isArray(eintrag.hotels)) {
      responded = true;
      clearTimeout(timeout);
      return res.json({
        count: 0,
        flag: false,
        message: "Noch keinen Eintrag gefunden",
      });
    }
    console.log("mongo-db-eintrag-length", eintrag.hotels.length); // gibt Int/Number zurück

    clearTimeout(timeout);
    responded = true;
    return res.json({ count: eintrag.hotels.length, flag: eintrag.flag }); // Rückgabe an Frontend
    // if (eintrag.hotels.length === 0) {
    //   return;
    // }
  } catch (err) {
    responded = true;
    clearTimeout(timeout);
    res.status(500).json({ message: err.message });
  }
});
export default router;

// 3. Ednpunkt:
// Abfrage der Hotels, die unter dieser UUID gespeichert sind
// und Rückgabe der Hotels ins Frontend

router.get("/hotels", async (req, res) => {
  const { limit } = req.query;
  const { count } = req.query;
  const { uuid } = req.query;

  console.log("limit:", limit);
  console.log("uuid:", uuid);
  console.log("Count:", count);
  try {
    const countNum = count ? parseInt(count, 10) : null;
    const limitNum = limit ? parseInt(limit, 10) : null;

    console.log("Parsed count:", countNum);
    if (countNum >= 0) {
      const eintrag = await UuidModel.findOne({ uuid: uuid }).exec();
      if (eintrag && Array.isArray(eintrag.hotels)) {
        const hotels = eintrag.hotels.slice(countNum, countNum + limitNum);
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
