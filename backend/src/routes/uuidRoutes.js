import express from 'express';
// v4 ist die am häufigsten verwendete Variante - generiert eine 128-Bit UUID
import { v4 as uuidv4 } from 'uuid'; // für eindeutige IDs
import UuidModel from '../models/uuidModel.js';

const router = express.Router();

// Diese Route generiert eine eindeutige UUID und speichert sie in der Datenbank
router.get("/generate", async (req, res) => {
    const uniqueId = uuidv4();
    try {
        const newUuid = new UuidModel({ uuid: uniqueId });
        await newUuid.save();
        console.log("UUID saved successfully:", uniqueId);
        res.status(200).json({ uuid: uniqueId });
    } catch (error) {
        console.error("Error saving UUID:", error);
        res.status(500).json({ error: "Error saving UUID" });
    }
});
export default router; 