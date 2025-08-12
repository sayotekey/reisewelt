import express from "express";
import { getAccessToken, fetchFromAmadeus } from "../api/amadeusService.js";
import UuidModel from "../models/uuidModel.js";
import TopTravelModel from "../models/topTravelModel.js";
import { v4 as uuidv4 } from "uuid";

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
router.get("/getHotelCount", async (req, res) => {
  try {
    const { cityName } = req.query;
    console.log("Received cityName:", cityName);
    const uniqueId = uuidv4();
    // Neue Stadt in DB speichern (falls nicht schon vorhanden)
    await TopTravelModel.create({
      uuid: uniqueId,
      city: cityName,
      hotels: [],
      flag: false,
    });

    const startDateFormatted = new Date().toISOString().split("T")[0];
    const endDateFormatted = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];
    const adults = 2;

    const cityCode = cityNameToCode[cityName];
    if (!cityCode) {
      return res.status(400).json({ message: "Unbekannter Städtename" });
    }

    const token = await getAccessToken();
    const hotelsbyCity = await fetchFromAmadeus(
      `/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`,
      token
    );

    const hotelIdList = hotelsbyCity.data.map((hotel) => hotel.hotelId);
    console.log("hotelIdList-Length", hotelIdList.length);

    let newCountList = 0;
    const newHotelIdList = [...hotelIdList];

    while (newHotelIdList.length > 0) {
      const batch = newHotelIdList.splice(0, 50).join(",");
      console.log("Frage Hotel-IDs an:", batch);

      const result = await fetchFromAmadeus(
        `/v3/shopping/hotel-offers?hotelIds=${batch}&checkInDate=${startDateFormatted}&checkOutDate=${endDateFormatted}&adults=${adults}`,
        token
      );

      if (result?.data?.length > 0) {
        const availableHotels = result.data.filter((h) => h.available === true);

        if (availableHotels.length > 0) {
          await TopTravelModel.findOneAndUpdate(
            { uuid: uniqueId },
            { $addToSet: { hotels: { $each: availableHotels } } }
          );

          newCountList += availableHotels.length;
          console.log(`${availableHotels.length} Angebote gespeichert`);

          if (newCountList >= 4) {
            console.log("4 Angebote gefunden → Abbruch");
            break;
          }
        }
      }
    }

    // Hier EINMAL zurückgeben
    res.json({ uniqueId, hotelCount: newCountList });
    console.log("newCountList (final):", newCountList);
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
});

// 2. Endpunkt:
// Abfrage der Anzahl der Hotels, die unter dieser UUID gespeichert sind
// und Rückgabe der Anzahl ins Frontend
// URL: http://localhost:3000/api/uuid/status/:uuid
/*
router.get("/status/:cityName", async (req, res) => {
  const { cityName } = req.params;
  console.log("endpunkt-zwei-CityName:", cityName);

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
    const eintrag = await TopTravelModel.findOne({ city: cityName }).exec();

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
  } catch (err) {
    responded = true;
    clearTimeout(timeout);
    res.status(500).json({ message: err.message });
  }
});
*/
// 3. Ednpunkt:
// Anfrage an MongoDB und Rückgabe der Hotels ins Frontend

router.get("/top-travel-hotels", async (req, res) => {
  try {
    const { uuid } = req.query;

    if (!uuid) {
      return res.status(400).json({ message: "UUID ist erforderlich" });
    }

    const eintrag = await TopTravelModel.findOne({ uuid }).exec();

    if (eintrag && Array.isArray(eintrag.hotels)) {
      res.json(eintrag.hotels);
    } else {
      res.status(404).json({ message: "Keine Hotels für diese UUID gefunden" });
    }
  } catch (error) {
    console.error("Fehler beim Abrufen der Hotels:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
});
///

router.get("/combined", async (req, res) => {
  const finalListOfHotelData = [];

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
      hotelIds: hotel.hotelId, // holt aus Amadeus-Anfrage Nr. 1 alle HotelIds für die spätere Verwendung (=> 2.Anfrage fuer Offers)
    }));
    console.log("hotelIdList-Length", hotelIdList.length);

    for (let i = 0; i < hotelIdList.length; i++) {
      console.log("Frage Hotel-ID an:", hotelIdList[i]); // Ausgabe im Terminal zur Kontrolle
      const result = await fetchFromAmadeus(
        `/v3/shopping/hotel-offers?hotelIds=${hotelIdList[i].hotelIds}`,
        token
      );

      // Prüfen, ob es Angebote mit available: true gibt
      if (
        result &&
        result.data &&
        Array.isArray(result.data) &&
        result.data.length > 0
      ) {
        finalListOfHotelData.push(...result.data);
        console.log("Angebote gefunden für Hotel-ID:", hotelIdList[i].hotelIds);
        if (finalListOfHotelData.length >= 4) {
          break; // Schleife beenden, sobald 3 Einträge gefunden wurden
        }
      } else {
        console.log(
          "No offers found or error for hotelId:",
          hotelIdList[i].hotelIds
        );
      }
    }
    // Send the collected hotel data as the response after the loop
    res.json(finalListOfHotelData);
  } catch (error) {
    console.error("Error in searchbar route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// for (let i = 0; i < Math.min(hotelsbyCity.data.length, 30); i++) {
//     finalListOfHotelData.push(hotelsbyCity.data[i]);

// if (Array.isArray(hotelsbyCity.data)) {
//     for (let i = 0; i < Math.min(hotelsbyCity.data.length, 30); i++) {
//         const result = await fetchFromAmadeus(`/v3/shopping/hotel-offers?hotelIds=${hotelsbyCity.data[i].hotelId}`, token);
//         finalListOfHotelData.push(result);
//         // Optionally log errors if present
//         if (result?.request?.data?.errors) {
//             console.log(result.request.data.errors);
//         }
//     }
// } else {
//     return res.status(404).json({ message: "No hotels found for this city." });
// }

// // Send the collected hotel data as the response
// res.json({ hotelOffers: finalListOfHotelData });

export default router;
