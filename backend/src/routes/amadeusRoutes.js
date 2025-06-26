import express from 'express';
import { getAccessToken, fetchFromAmadeus } from "../api/amadeusService.js";

const router = express.Router();
// const cityCodes = ["PAR", "BER", "ROM", "MAD", "VIE", "AMS", "BRU", "CPH", "STO", "LON"];

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
    try {
        const { cityName } = req.query; // Städtenamen auslesen
        console.log("Received cityName:", cityName);

        // CityCode suchen
        const cityCode = cityNameToCode[cityName];
        if (!cityCode) {
            return res.status(400).json({ message: "Unbekannter Städtename" });
        }
        // edit: im Frontend=> später Logik für required cityCode hinzufügen
        // Umwandlung Input in cityCode


        const token = await getAccessToken(); // Ensure having the access token before making the request

        // Anfrage an verschiedene Amadeus-Endpunkte
        const [hotelsbyCity, hotelIds, hotelOffers] = await Promise.all([
            fetchFromAmadeus(`/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, token), // alle Hotel by Citycode
            // fetchFromAmadeus(`/v1/activity/activities/by-city?cityCode=${cityCode}`, token),
            // fetchFromAmadeus(`/v1/activity/activities/by-city?cityCode=${cityCode}`, token)
        ]);

        const validListOfHotelsByCityCode = [];

        for (let i = 0; i < hotelsbyCity.data.length; i++) {
            if (validListOfHotelsByCityCode.length >= 30) break; // Entfernen von ungültigen Einträgen
            const hotel = hotelsbyCity.data[i];
            // Überprüfen, ob hotelId vorhanden ist
            if (hotel.hotelId) {
                validListOfHotelsByCityCode.push({
                    name: hotel.name,
                    hotelId: hotel.hotelId,
                    city: hotel.iataCode,
                    country: hotel.address.countryCode,
                    geoCode: hotel.geoCode
                });
            }
        };

        // // Daten zusammenfassen
        // const result = {
        //     hotelList: validListOfHotelsByCityCode,
        //     hotelIdsList: hotelIds.data,
        //     hotelOffersList: hotelOffers.data // ??

        // };

        res.json(validListOfHotelsByCityCode);

    } catch (error) {
        console.error("Error in searchbar route:", error);
        res.status(500).json({ message: "Internal server error" });

    }
});
export default router;