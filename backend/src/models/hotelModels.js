const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,},
land: {
        type: String,
        required: true,},
    city: {
        type: String,
        required: true,},
    price: {
        type: Number,
        required: true,},
rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5}}, {timestamps: true }
);

module.exports = mongoose.model('Hotel', hotelSchema);