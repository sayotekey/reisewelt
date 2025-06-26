import UserModel from "../models/UserModel.js";
import hotelModels from "../models/hotelModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Regestrierung eines neuen Benutzers - Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Überprüfen, ob der Benutzer bereits existiert
    const existingUser = await UserModel.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Benutzer existiert bereits" });

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);

    // Neuen Benutzer erstellen
    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Benutzer erfolgreich registriert" });
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error: error });
  }
};

// Benutzeranmeldung - Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Benutzer suchen
    const user = await UserModel.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "Ungültige E-Mail oder Passwort" });

    // Passwort überprüfen
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res
        .status(400)
        .json({ message: "Ungültige E-Mail oder Passwort" });

    // JWT Token generieren
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "Serverfehler", error: error });
  }
};

// Benutzerprofil abrufen - Get Profile

export const getUserProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id)
      .select("-password") // Passwort nicht zurückgeben
      .populate("reviews.hotelId") // Ausgewählte Hotels in Reviews
      .populate("bookings.hotelId") // Ausgewählte Hotels in Buchungen
      .populate("favoriteHotels"); // Ausgewählte Hotels in Favoriten

    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    res.json(user);
  } catch (error) {
    console.error("Fehler beim Laden des Benutzerprofils:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};
