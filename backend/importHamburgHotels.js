import mongoose from "mongoose";
import dotenv from "dotenv";
import Hotel from "./src/models/hotelModels.js";
import hamburgHotels from "./data/hamburgHotels.js";

dotenv.config();

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Hotel.deleteMany();
    await Hotel.insertMany(hamburgHotels);

    console.log("Hamburg hotels imported successfully!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();
