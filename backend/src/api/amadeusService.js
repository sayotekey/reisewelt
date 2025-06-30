import axios from "axios";
// import HotelAmadeus from "../models/hotelModelAmadeus.js";

let accessToken = ''; // Variable to store the access token von Amadeus API.

// Funktion zum Abrufen des Tokens (Zugriffsschlüssels)
export async function getAccessToken() {
    try {
        const data = {
            grant_type: 'client_credentials',// Specify the grant type für unser token request
            client_id: process.env.AMADEUS_API_KEY,
            client_secret: process.env.AMADEUS_API_SECRET
        };

        const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token',
            new URLSearchParams({
                grant_type: 'client_credentials',// Specify the grant type für unser token request
                client_id: process.env.AMADEUS_API_KEY,
                client_secret: process.env.AMADEUS_API_SECRET
            }));
        accessToken = response.data.access_token; //speichern access token in unsere Variable
        return accessToken;
    } catch (error) {
        console.error('Error fetching access token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch access token');
    }
}

// Fetch von AmadeusAPI und Rückgabe ins Frontend
export async function fetchFromAmadeus(endpoint, accessToken) {
    const url = `https://test.api.amadeus.com${endpoint}`;
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                // accept: 'application/vnd.amadeus+json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data from Amadeus:', error.response ? error.response.data : error.message);
        return null; // fängt den Fehler ab und gibt null zurück, wenn ein Fehler auftritt, axios wirft einen Fehler, wenn die Anfrage fehlschlägt und bricht leider sonst ab
        // mit "null" wird nichts zurückgegeben, das kann später für die Offer-Validierung im Backend benutzt werden
    }

    //https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=EBLONEBE
    async function getHotelOffers(hotelIds) {
        try {
            const token = await getAccessToken();
            const response = await axios.get(`https://test.api.amadeus.com/v3/shopping/hotel-offers`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    params: { hotelIds } // "hotelIds" ist die Bezeichnung von Amadeus Api und wird als String genommen
                },
            );
            // Die Amadeus API liefert ein Array unter response.data.data
            const hotels = response.data.data || []; // []

            // Für jeden Datensatz ein neues Mongoose-Dokument anlegen und speichern
            for (let hotel of hotels) {
                // Sicherstellen, dass die verschachtelten Eigenschaften existieren

                const hotelDataAmadeus = new HotelAmadeus({
                    type: hotel.hotel.type,
                    hotelId: hotel.hotel.hotelId,
                    chainCode: hotel.hotel.chainCode,
                    name: hotel.hotel.name,
                    cityCode: hotel.hotel.cityCode,
                    // address: hotel.hotel.address,
                    // rating: hotel.hotel.rating,

                    // ...weitere Felder
                });
                //  console.log(hotelDataAmadeus);
                try {
                    await hotelDataAmadeus.save();
                    console.log(`Hotel ${hotelDataAmadeus.hotelId} gespeichert.`);
                } catch (err) {
                    console.error(`Fehler beim Speichern von Hotel ${hotelDataAmadeus.hotelId}:`, err.message);
                }
            }
            return hotels; // Optional: Rückgabe der gespeicherten Hotels
        } catch (error) {
            console.error('Error fetching hotels by hotelIds:', error.response ? error.response.data : error.message);
            throw new Error('Failed to fetch hotels by hotelIds');
        }
    }
}
// export default{ getAccessToken, fetchFromAmadeus };
