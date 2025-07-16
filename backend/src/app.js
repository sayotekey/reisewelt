import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hotelsRoutes from "./routes/hotelsRoutes.js";
import amadeusRoutes from "./routes/amadeusRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uuidRoutes from "./routes/uuidRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/uuid", uuidRoutes); // UUID Route, http://localhost:3000/api/uuid/generate
// UUID Status Route, http://localhost:3000/api/uuid/status/:uuid
// UUID Hotels Anfrage Route, http://localhost:3000/api/uuid/hotels/:uuid?count=5

app.use("/api", contactRoutes);

app.use("/api/hotels", hotelsRoutes);
app.use("/api/amadeus", amadeusRoutes); // Amadeus API routes lautet : http://localhost:3000/api/amadeus/combined
app.use("/api/amadeus/test", (req, res) => {
  res.json({ message: "Amadeus API is working!" });
});

// DB connection
mongoose
  .connect(process.env.MONGODB_URL)
  .then(async () => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
