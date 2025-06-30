import express from "express";
import auth from "../middleware/auth.js"; 

import Review from "../models/reviewModel.js";

const router = express.Router();

//  take all reviews (no auth required)
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }); // sort by createdAt in descending order
    res.json(reviews);
  } catch (error) {
    console.error("Fehler beim Abrufen der Bewertungen:", error);
    res.status(500).json({ message: "Fehler beim Abrufen der Bewertungen" });
  }
});

// create a new review (auth required)
router.post("/", auth, async (req, res) => {
  const { text, rating } = req.body;

  if (!text || !rating) {
    return res.status(400).json({ message: "Text und Bewertung sind erforderlich" });
  }

  try {
    const newReview = new Review({
      name: req.user.name,
      text,
      rating,
      userId: req.user.id, // obtained from token
    });

    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Fehler beim Speichern der Bewertung:", error);
    res.status(500).json({ message: "Fehler beim Speichern der Bewertung" });
  }
});

export default router;
