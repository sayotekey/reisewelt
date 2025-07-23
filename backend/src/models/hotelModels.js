import mongoose from 'mongoose';

// const hotelSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     land: {
//         type: String,
//         required: true,
//     },
//     cityCode: {
//         type: String,
//         required: true,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     rating: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5,
//     }
// }, { timestamps: true }
// );


const reviewSchema = new mongoose.Schema({
  name: String,
  text: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now },
}, { _id: false }); 

const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  rating: String,
  ratingScore: Number,
  reviewsCount: Number,
  nights: String,
  availableFrom: Date,
  availableTo: Date,
  price: String,
  priceValue: Number,
  image: String,
  gallery: [String],
  stars: Number,
  district: String,
  amenities: [String],
  roomType: String,
  breakfast: String,
  parking: Boolean,
  petFriendly: Boolean,
  businessCenter: Boolean,
  pool: Boolean,
  wifi: Boolean,
  airConditioning: Boolean,
  checkIn: String,
  checkOut: String,
  shortDescription: String,
  fullDescription: String,
  reviews: [reviewSchema], 
}, { timestamps: true });

export default mongoose.model('Hotel', hotelSchema);
