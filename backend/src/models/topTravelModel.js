import mongoose from "mongoose";

const saveTopTravelSchema = new mongoose.Schema({
  uuid: { type: String, required: true },
  city: {
    type: String,
    required: true,
  },
  hotels: [{ type: Array }],
  flag: {
    type: Boolean,
    default: false,
  },
});
const TopTravelModel = mongoose.model(
  "TopTravelHotelLists",
  saveTopTravelSchema
);

export default TopTravelModel;
