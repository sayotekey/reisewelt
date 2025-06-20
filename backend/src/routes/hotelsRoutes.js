import express from 'express';
 import Hotel from '../models/hotelModels.js';
 import amadeusService from '../api/amadeusService.js';
 import seedHotels from '../services/hotelSeeder.js';


const router = express.Router();

router.post('/', async (req, res) => {
  try {
    console.log(req.body);
    const hotel = new Hotel(req.body);
    await hotel.save();
    res.status(201).json(hotel);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const filter={};
    if (req.query.city){
        filter.city = {$regex: req.query.city, $options: 'i' };//egal welche erste buchstabe groß oder klein geschrieben ist
    }
    const hotels = await Hotel.find(filter);
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// generieren von hotels
router.post('/generate', async (req, res) => {
    const { count } = req.body;

    // Überprüfen, ob count angegeben ist und eine positive Zahl ist
    if (!count || typeof count !== 'number' || count <= 0) {
        return res.status(400).json({ message: 'Geben Sie eine positive Zahl in „count“ an.' });
    }

    try {
      // Aufruf der Funktion  seedHotels zum Generieren von Hotels
        const hotels = await seedHotels(count);
        //erfolgreich generierte Hotels zurückgeben
        res.status(201).json({
            message: `Erstellen ${hotels.length} hotels erfolgreich!`,
            hotels
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error creating hotels' });
    }
});


//neue route für hotels von Amadeus API (Wir erstellen die GET-Route /api/hotels/fetch/:cityCode – :cityCode bedeutet, dass die URL den Stadtcode enthält, z. B. /fetch/BER.)

  router.get('/fetch/:cityCode', async (req, res) => {
    try{
      const {cityCode} = req.params; // Extract the city code from the request parameters
      const {checkInDate, adults} = req.query; // Extract check-in date and number of adults from query parameters
      const hotelsFromAmadeus = await amadeusService.fetchHotels(cityCode, checkInDate, adults)// Call the Amadeus service to fetch hotels for the given city code
      const savedHotels = []// 
      for ( const amadeusHotel of hotelsFromAmadeus){
        const hotelData = {
           hotelId: amadeusHotel.hotelId,       // bestimmte hotelId von amadeus ??
        name: amadeusHotel.name,             // hotelname
        city: amadeusHotel.iataCode,         // city
        country: amadeusHotel.address?.countryCode || 'wasistdenndas', // countryCode
        latitude: amadeusHotel.geoCode?.latitude,
        longitude: amadeusHotel.geoCode?.longitude,
        };

        // Check if the hotel already exists in the database
        let hotel = await Hotel.findOne({hotelId : hotelData.hotelId});
        if (!hotel){
          hotel = new Hotel(hotelData);
          await hotel.save(); // Save the hotel to the database
        }
        savedHotels.push(hotel)
      }
      res.json(savedHotels); // Return the list of saved hotels
    }catch (err){
      console.error(err);
      res.status(500).json({ message: 'Error fetching hotels from Amadeus API' });
      
    }
  });

 
 
export default router;