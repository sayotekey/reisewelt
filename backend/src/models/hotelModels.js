

//const mongoose = require('mongoose');
import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    land: {
        type: String,
        required: true,
    },
    cityCode: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    }
}, { timestamps: true }
);


 export default  mongoose.model('Hotel', hotelSchema);

