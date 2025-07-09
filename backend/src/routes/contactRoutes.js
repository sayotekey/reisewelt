import express from "express";
import ContactModel from "../models/contactModel.js";

const router = express.Router();

router.post("/contact", async (req, res) => {
  try {
    const { name, email, callback, phone, message } = req.body;

    const newContact = new ContactModel({
      name,
      email,
      callback,
      phone,
      message,
    });

    await newContact.save();

    res.status(200).json({ message: "Kontaktformular erfolgreich gesendet" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Fehler beim Senden des Kontaktformular" });
  }
});

export default router;
