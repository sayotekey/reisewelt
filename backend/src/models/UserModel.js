import mongoose from "mongoose";

const { Schema } = mongoose;

const bookingSchema = new Schema({
  hotelId: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
  date: { type: Date, default: Date.now },
});

const reviewSchema = new Schema({
  hotelId: { type: Schema.Types.ObjectId, ref: "Hotel", required: true },
  comment: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  date: { type: Date, default: Date.now },
});

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    favoriteHotels: [{ type: Schema.Types.ObjectId, ref: "Hotel" }],
    bookings: [bookingSchema],
    reviews: [{type: mongoose.Schema.Types.ObjectId, ref: "Review"}],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
