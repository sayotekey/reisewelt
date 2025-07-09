import express from 'express';
// v4 ist die am häufigsten verwendete Variante - generiert eine 128-Bit UUID
import { v4 as uuidv4 } from 'uuid'; // für eindeutige IDs
import UuidModel from '../models/uuidModel.js';
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
    Zürich: "ZRH"

    // ...weitere Städte
};

// Diese Route generiert eine eindeutige UUID und speichert sie in der Datenbank
router.get("/generate", async (req, res) => {
    const uniqueId = uuidv4();
    try {
        const newUuid = new UuidModel({ uuid: uniqueId });
        await newUuid.save();
        console.log("UUID saved successfully:", uniqueId);
        res.status(200).json({ uuid: uniqueId }); // für das Frontend
    } catch (error) {
        console.error("Error saving UUID:", error);
        res.status(500).json({ error: "Error saving UUID" });
    }

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

        const hotelsbyCity = await fetchFromAmadeus(`/v1/reference-data/locations/hotels/by-city?cityCode=${cityCode}`, token); // alle Hotels by Citycode

        const hotelIdList = hotelsbyCity.data.map(hotel => ({
            hotelIds: hotel.hotelId // holt aus Amadeus-Anfrage Nr. 1 alle HotelIds fuer die spaetere Verwendung (=> 2.Anfrage fuer Offers)
        }))
        console.log("hotelIdList-Length", hotelIdList.length);

        for (let i = 0; i < hotelIdList.length; i++) {
            console.log("Frage Hotel-ID an:", hotelIdList[i]); // Ausgabe im Terminal zur Kontrolle
            const result = await fetchFromAmadeus(`/v3/shopping/hotel-offers?hotelIds=${hotelIdList[i].hotelIds}`, token); // alle Hotelangebote für die jeweilige Hotel-ID

            // Pruefen, ob es Angebote mit available: true gibt
            if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
                finalListOfHotelData.push(...result.data);
                console.log("Angebote gefunden für Hotel-ID:", hotelIdList[i].hotelIds);
                if (finalListOfHotelData.length >= 4) {
                    break; // Schleife beenden, sobald 3 Einträge gefunden wurden
                }
            } else {
                console.log("No offers found or error for hotelId:", hotelIdList[i].hotelIds);
            }
        }
        // Speichere die gesammelten Hoteldaten zur UUID in MongoDB
        await UuidModel.findOneAndUpdate(
            { uuid: uniqueId },
            { $set: { hotels: finalListOfHotelData } }
        );

    } catch (error) {
        console.error("Error fetching hotel data:", error);
        res.status(500).json({ error: error.message });
    }

});

router.get('/status/:uuid', async (req, res) => {
    const { uuid } = req.params;
    const eintrag = await UuidModel.findOne({ uuid });
    if (eintrag) {
        // Daten vorhanden
        return res.status(200).json(eintrag);
    }
    // Noch keine Daten
    res.status(404).json(); // UUID nicht gefunden
});

export default router; 