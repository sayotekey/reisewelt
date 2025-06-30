import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import reviewsRoutes from './routes/reviewsRoutes.js';
import hotelsRoutes from './routes/hotelsRoutes.js';
import amadeusRoutes from './routes/amadeusRoutes.js';
import userRoutes from './routes/userRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

import SearchedHotel from "./models/searchedHotel.js";
// import { fetchAndSaveHotels } from "./api/amadeusService.js";







const app = express();
const PORT = process.env.PORT || 3000;
// const cityCodes = ["PAR", "BER", "ROM", "MAD", "VIE", "AMS", "BRU", "CPH", "STO", "LON"];

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/hotels', hotelsRoutes);//!!
app.use('/api/users', userRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/reviews', reviewsRoutes);

app.use('/api/hotels', hotelsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/amadeus', amadeusRoutes);// Amadeus API routes lautet : http://localhost:3000/api/amadeus/combined?cityCode=PAR
app.use("/api/amadeus/test", (req, res) => {
  res.json({ message: "Amadeus API is working!" });
});

// DB connection
mongoose.connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log('MongoDB connected');

    const exists = await SearchedHotel.findOne();
    if (!exists) {
      console.log("Database will be filled with hotel data.");
      // cityCodes.forEach(city => {
      //   amadeusService.fetchAndSaveHotels(city);
      // });
      console.log("Database filling is done.");
    } else {
      console.log("Database is already filled.");
    }

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));


