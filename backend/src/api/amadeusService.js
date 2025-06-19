
const axios = require('axios');

let accessToken = ''; // Variable to store the access token von Amadeus API.

// Funktion zum Abrufen des Tokens (Zugriffsschlüssels)
async function getAccessToken() {
    const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', null, {
        params: {
            grant_type: 'client_credentials',// Specify the grant type für unser token request
            client_id: process.env.AMADEUS_API_KEY,
            client_secret: process.env.AMADEUS_API_SECRET
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'//teilt dem Amadeus-Server mit, in welchem Format wir Daten übertragen.
        }
    });
    accessToken = response.data.access_token; //speichern access token in unsere Variable
    return accessToken;
}

//wir erstelllen 2 function , sie werden undere hotels erhalten
async function fetchHotels(cityCode = 'BER') {
    if (!accessToken) {
        await getAccessToken(); // Check if access token is available, if not, fetch it
    }
    const response = await axios.get('https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city', {
        headers: {
            Authorization: `Bearer ${accessToken}` // ich habe token ich kann infoHotels sehen 
        },
        //Wir geben den Code der Stadt ein, in der wir Hotels suchen möchten. (BER, PAR; ROM)
        params: {
            cityCode,
        }
    });
    return response.data.data; // Return the list of hotels
}
module.exports = {
    fetchHotels,
};