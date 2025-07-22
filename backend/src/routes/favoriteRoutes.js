import express from "express";
import {
  getFavorites,
  addFavorite,
  removeFavorite,
} from "../controllers/favoriteController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getFavorites);
router.post("/", auth, addFavorite);
router.delete("/:hotelId", auth, removeFavorite);

export default router;
