import express from "express";
import News from "../models/newsModel.js";

const router = express.Router();

// GET /api/news?language=de oder GET /api/news?language=en
router.get("/", async (req, res) => {
  try {
    const { language = "de" } = req.query;

    const news = await News.find({ language: language }).sort({
      createdAt: -1,
    }); // createdAt: -1  das bedeutet, dass die neuesten Nachrichten zuerst kommen

    res.json(news);
  } catch (err) {
    res.status(500).json({ error: "Error loading news." });
  }
});

// alle Nachrichten nach ID abrufen
router.get("/:id", async (req, res) => {
  try {
    const newsItem = await News.findById(req.params.id);
    if (!newsItem) {
      return res.status(404).json({ error: "News not found." });
    }
    res.json(newsItem);
  } catch (err) {
    res.status(500).json({ error: "Error loading news." });
  }
});

export default router;
