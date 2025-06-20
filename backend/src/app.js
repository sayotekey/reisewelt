
// require('dotenv').config();
import 'dotenv/config';
// const express = require('express');
import express from 'express';
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
// const hotelsRoutes = require('./routes/hotelsRoutes');
import hotelsRoutes from './routes/hotelsRoutes.js';
// const cors = require('cors');
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hotels', hotelsRoutes);//!!

// DB connection
mongoose.connect(`${process.env.MONGODB_URL}`)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));


