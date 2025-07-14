import UserModel from "../models/UserModel.js";
import hotelModels from "../models/hotelModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

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
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

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
      .populate("reviews") // Bewertungen des Benutzers
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

// Passwort ändern - Change Password
export const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    // Benutzer suchen
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden" });
    }

    // Altes Passwort wird mit dem in der Datenbank gehashten Passwort verglichen
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Altes Passwort ist falsch" });
    }

    // Neues Passwort hashen
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Passwort aktualisieren
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Passwort erfolgreich geändert" });
  } catch (error) {
    console.error("Fehler beim Ändern des Passworts:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};

// Passwort zurücksetzen - Forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Überprüfen, ob die E-Mail vorhanden ist
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    // Erstellen einen JWT-Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Erstellen den Reset-URL
    const resetUrl = `http://localhost:5173/reset-password?token=${token}`;

    // E-Mail-Transporter konfigurieren
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      to: user.email,
      subject: "Passwort zurücksetzen",
      html: `<p>Klicken Sie auf den folgenden Link, um Ihr Passwort zurückzusetzen:</p>
             <a href="${resetUrl}">${resetUrl}</a>`,
    });

    res.json({
      message:
        "Ein Link zum Zurücksetzen des Passworts wurde an Ihre E-Mail-Adresse gesendet.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim Senden der E-Mail" });
  }
};

// Passwort zurücksetzen - Reset Password

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Token und neues Passwort sind erforderlich." });
  }

  try {
    // Überprüfen den Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);

    // Überprüfen, ob der Benutzer existiert
    if (!user) {
      return res.status(404).json({ message: "Benutzer nicht gefunden." });
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Passwort erfolgreich zurückgesetzt." });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Ungültiger oder abgelaufener Token." });
  }
};

// Benutzer Persönliche Daten bearbeiten/ aktualisieren
export const updateUserData = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        updatedAt: updatedUser.updatedAt,
      });
    } else {
      res.status(404).json({ message: "Benutzer nicht gefunden" });
    }
  } catch (error) {
    console.error("Fehler beim Aktualisieren:", error);
    res.status(500).json({ message: "Serverfehler" });
  }
};
