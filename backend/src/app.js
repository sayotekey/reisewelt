import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import reviewsRoutes from "./routes/reviewsRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import newsRoutes from "./routes/newsRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hotelsRoutes from "./routes/hotelsRoutes.js";
import amadeusRoutes from "./routes/amadeusRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import uuidRoutes from "./routes/uuidRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
// Configure CORS - allow a list of origins from env or fallback to known dev/prod origins
const allowedOrigins = (process.env.ALLOWED_ORIGINS &&
  process.env.ALLOWED_ORIGINS.split(",")) || [
  "https://reisewelt-frontend.onrender.com",
  "https://reisewelt-zeta.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin like mobile apps or curl
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(new Error("CORS policy: Origin not allowed"), false);
    },
    credentials: true,
  })
);
app.use(express.json());

// Routes

app.use("/api/users", userRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/uuid", uuidRoutes); // UUID Route, http://localhost:3000/api/uuid/generate
// UUID Status Route, http://localhost:3000/api/uuid/status/:uuid
// UUID Hotels Anfrage Route, http://localhost:3000/api/uuid/hotels/:uuid?count=5

app.use("/api", contactRoutes);

app.use("/api/hotels", hotelsRoutes);
app.use("/api/amadeus", amadeusRoutes); // Amadeus API routes lautet : http://localhost:3000/api/amadeus/combined
app.use("/api/amadeus/test", (req, res) => {
  res.json({ message: "Amadeus API is working!" });
});

app.use((req, res) => {
  res.status(404).json({ message: "Route nicht gefunden" });
});

// DB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
