import express from "express";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import {
  registerUser,
  loginUser,
  getUserProfile,
  changePassword,
} from "../controllers/userController.js";
import UserModel from "../models/UserModel.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", auth, getUserProfile);
router.post("/change-password", auth, changePassword);

router.post("/forgot-password", async (req, res) => {
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
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;

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
});

export default router;
