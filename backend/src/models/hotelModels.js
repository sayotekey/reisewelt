import mongoose from 'mongoose';

const hotelSchema = new mongoose.Schema({
  brand: { type: String, required: true },
  name: { type: String, required: true },
  country: { type: String, required: true },
  city: { type: String, required: true },
  address: { type: String },
  pricePerPerson: { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 6 },
  stars: { type: Number, min: 1, max: 6 },
  image: { type: String },
  allInclusive: { type: Boolean, default: false },
  lastMinute: { type: Boolean, default: false },
  roomType: { type: String },
  guests: { type: Number },
  startDate: { type: Date },
  nights: { type: Number },
  mapLink: { type: String },
  offerLink: { type: String },
}, { timestamps: true });

const hotelModel = mongoose.model("Hotel", hotelSchema)
export default hotelModel;
