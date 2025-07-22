import UserModel from "../models/UserModel.js";
import Hotel from "../models/hotelModels.js";
import mongoose from "mongoose";

export const getFavorites = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate(
      "favoriteHotels"
    );
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
    res.json(user.favoriteHotels);
  } catch (error) {
    console.error("Fehler beim Laden der Favoriten:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

export const addFavorite = async (req, res) => {
  const { hotelId } = req.body;

  // Überprüfen, ob die Hotel-ID gültig ist
  if (!mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ message: "Ungültige Hotel-ID" });
  }

  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    // Überprüfen, ob das Hotel bereits im Merkzettel ist
    if (!user.favoriteHotels.includes(hotelId)) {
      user.favoriteHotels.push(hotelId);
      await user.save();
    }
    res.status(200).json({ message: "Hotel zum Merkzettel hinzugefügt" });
  } catch (error) {
    console.error("Fehler beim Hinzufügen:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

export const removeFavorite = async (req, res) => {
  const { hotelId } = req.params;

  if (!hotelId || !mongoose.Types.ObjectId.isValid(hotelId)) {
    return res.status(400).json({ message: "Ungültige Hotel-ID" });
  }

  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    user.favoriteHotels = user.favoriteHotels.filter(
      (id) => id.toString() !== hotelId
    );
    await user.save();
    res.status(200).json({ message: "Hotel vom Merkzettel entfernt" });
  } catch (error) {
    console.error("Fehler beim Entfernen:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};
