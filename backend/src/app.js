
// require('dotenv').config();
import 'dotenv/config';
// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const hotelsRoutes = require('./routes/hotelsRoutes');
import hotelsRoutes from './routes/hotelsRoutes.js';
import userRoutes from './routes/userRoutes.js';
// const cors = require('cors');
import cors from 'cors';
import SearchedHotel from "./models/searchedHotel.js";
import amadeusService from "./api/amadeusService.js"



const app = express();
const PORT = process.env.PORT || 3000;
const cityCodes = ["PAR", "BER", "ROM", "MAD", "VIE", "AMS", "BRU", "CPH", "STO", "LON"];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hotels', hotelsRoutes);//!!
app.use('/api/users', userRoutes); 

// DB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log('MongoDB connected');

    const exists = await SearchedHotel.findOne();
    if (!exists) {
      console.log("Database will be filled with hotel data.");
      cityCodes.forEach(city => {
        amadeusService.fetchAndSaveHotels(city);
      });
      console.log("Database filling is done.");
    } else {
      console.log("Database is already filled.");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));


