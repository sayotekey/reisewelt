
import axios from 'axios'; // Importiere axios für HTTP-Anfragen
/* const qs = require ('qs') */// koddiere body in URL-encoded format, damit Amadeus API es versteht
let accessToken = ''; // Variable to store the access token von Amadeus API.



// Funktion zum Abrufen des Tokens (Zugriffsschlüssels)
const getAccessToken = async() => {
    try {
 const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', qs.stringify({
 grant_type: 'client_credentials',// Specify the grant type für unser token request
            client_id: process.env.AMADEUS_API_KEY,
            client_secret: process.env.AMADEUS_API_Secret
 }),
 {        headers: {
            'Content-Type': 'application/x-www-form-urlencoded' // teilt dem Amadeus-Server mit, in welchem Format wir Daten übertragen.
        }
    }
 
    );

   return response.data.access_token; // Return the access token from the response
} catch (error) {
     console.error('Ошибка при получении токена доступа:', error.response?.data || error.message);
    throw error;
  }
};

// Поиск отелей через Amadeus API
const fetchHotels = async ({ cityCode = 'PAR', checkInDate = '2025-07-01', adults = 1  }) => {
    const token = await getAccessToken();
        const params = { cityCode, checkInDate, adults }; // Добавляем параметры запроса

const response = await axios.get(
        'https://test.api.amadeus.com/v2/shopping/hotel-offers',
        {
            headers: { Authorization: `Bearer ${token}` },
            params: params
        }
    );
    return response.data;
};
export default { getAccessToken, fetchHotels };