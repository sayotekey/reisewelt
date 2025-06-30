import express from 'express';

// import Hotel from "../models/hotelModels.js"
// import amadeusService from "../api/amadeusService.js"
// import SearchedHotel from "../models/searchedHotel.js"

// Erstelle einen Router aus Express
const router = express.Router();

// Definiere die Routen
// router.post('/', async (req, res) => {
//   try {
//     console.log(req.body);
//     const hotel = new Hotel(req.body);
//     await hotel.save();
//     res.status(201).json(hotel);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.city) {
      filter.city = { $regex: req.query.city, $options: 'i' };//egal welche erste buchstabe groß oder klein geschrieben ist
    }
    const hotels = await Hotel.find(filter);
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//neue route für hotels von Amadeus API via POSTMAN-ANFRAGE
// route lautet: http://localhost:3000/api/hotels/amadeus/hotelIds
router.get('/amadeus/hotelIds', async (req, res) => {
  try {
    const hotelIds = req.query.hotelIds;

    const hotels = await amadeusService.getHotelOffers(hotelIds);
    res.json(hotels);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//neue route für hotels von MongoDB
// router.get('/fetch/:cityCode', async (req, res) => {
// /fetch ist nicht notwendig, aber erlaubt. Für eine klassische REST-API 
// ist /hotels/:cityCode (ohne /fetch) üblicher und klarer.
router.get('/:cityCode', async (req, res) => {
  try {
    const cityCode = req.params.cityCode;
    const hotelList = await Hotel.find({ cityCode: cityCode });
    res.json(hotelList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})

export default router;

