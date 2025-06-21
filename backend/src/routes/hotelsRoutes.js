
// const express = require('express');
import express from 'express';
// const Hotel = require('../models/hotelModels');
import Hotel from "../models/hotelModels.js"
// const amadeusServise = require('../api/amadeusService');
import amadeusService from "../api/amadeusService.js"
import SearchedHotel from "../models/searchedHotel.js"

// Erstelle einen Router aus Express
const router = express.Router();

// Definiere die Routen
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


// generieren von hotels
//*router.post('/generate', async (req, res) => {
//  const { count } = req.body; 

// Überprüfen, ob count angegeben ist und eine positive Zahl ist
//if (!count || typeof count !== 'number' || count <= 0) {
// return res.status(400).json({ message: 'Geben Sie eine positive Zahl in „count“ an.' });


// try {
// Aufruf der Funktion  seedHotels zum Generieren von Hotels
//const hotels = await seedHotels(count);
//erfolgreich generierte Hotels zurückgeben
//res.status(201).json({
//message: `Erstellen ${hotels.length} hotels erfolgreich!`,
//hotels
// });
//  } catch (error) {
// console.error('Error:', error);
// res.status(500).json({ message: 'Error creating hotels' });
//   }
//}); 





//neue route für hotels von Amadeus API
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

router.get('/amadeus/cityCode', async (req, res) => {
  try {
    const cityCode = req.query.cityCode;

    //const hotels = await amadeusService.getHotelsByCityCode(cityCode);
    const hotels = await SearchedHotel.find({ iataCode: cityCode });
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
// module.exports = router;

