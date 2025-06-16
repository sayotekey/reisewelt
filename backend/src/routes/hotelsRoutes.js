const express = require('express');
const router = express.Router();
const Hotel = require('../models/hotelModels');
const amadeusServise = require('../api/amadeusService');

router.post ('/', async (req, res) => {
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

//neue route für hotels von Amadeus API
/* router.get('/fetch/:cityCode', async (req, res) => {
  try{
    
  }
})
 */
module.exports = router;