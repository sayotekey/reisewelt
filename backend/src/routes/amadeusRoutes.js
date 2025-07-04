import express from 'express';
import { getAccessToken, fetchFromAmadeus } from "../api/amadeusService.js";

const router = express.Router();

const cityNameToCode = {
    Amsterdam: "AMS",
    Antwerpen: "ANR",
    Barcelona: "BCN",
    Berlin: "BER",
    Bologna: "BLQ",
    Brüssel: "BRU",
    Düsseldorf: "DUS",
    Dublin: "DUB",
    Edinburgh: "EDI",
    Frankfurt: "FRA",
    Genf: "GVA",
    Graz: "GRZ",
    Hamburg: "HAM",
    Innsbruck: "INN",
    Kopenhagen: "CPH",
    Köln: "CGN",
    Leipzig: "LEJ",
    Lissabon: "LIS",
    London: "LON",
    Lyon: "LYS",
    Madrid: "MAD",
    Marseille: "MRS",
    München: "MUC",
    Nizza: "NCE",
    Oslo: "OSL",
    Palma: "PMI",
    Paris: "PAR",
    Porto: "OPO",
    Rom: "ROM",
    Salzburg: "SZG",
    Sevilla: "SVQ",
    Stockholm: "STO",
    Stuttgart: "STR",
    Toulouse: "TLS",
    Valencia: "VLC",
    Wien: "VIE",
    Zürich: "ZRH"

    // ...weitere Städte
};

router.get("/combined", async (req, res) => {

    const finalListOfHotelData = [];
    const invalidListOfHotels = [];

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

        const hotelsbyCity = await fetchFromAmadeus(`/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, token); // alle Hotels by Citycode

        // console.log("hotelbyCity-Length", hotelsbyCity.data.length); // Ausgabe im Terminal zur Kontrolle

        const hotelIdList = hotelsbyCity.data.map(hotel => ({
            hotelIds: hotel.hotelId // holt aus Amadeus-Anfrage Nr. 1 alle HotelIds für die spätere Verwendung (=> 2.Anfrage fuer Offers)
        }))
        console.log("hotelIdList-Length", hotelIdList.length);
        //  console.log("hotelIdList", hotelIdList.slice(0, 2));

        for (let i = 0; i < hotelIdList.length; i++) {
            console.log("Frage Hotel-ID an:", hotelIdList[i]); // Ausgabe im Terminal zur Kontrolle
            const result = await fetchFromAmadeus(`/v3/shopping/hotel-offers?hotelIds=${hotelIdList[i].hotelIds}`, token);

            // Prüfen, ob es Angebote mit available: true gibt
            if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
                finalListOfHotelData.push(...result.data);
                console.log("Angebote gefunden für Hotel-ID:", hotelIdList[i].hotelIds);
                //     if (finalListOfHotelData.length >= 4) {
                //         break; // Schleife beenden, sobald 3 Einträge gefunden wurden
                //     }
            } else {
                console.log("No offers found or error for hotelId:", hotelIdList[i].hotelIds);
            }
        }
        // Send the collected hotel data as the response after the loop
        res.json(finalListOfHotelData);
    }

    catch (error) {
        console.error("Error in searchbar route:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
);

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