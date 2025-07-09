import express from 'express';
// v4 ist die am häufigsten verwendete Variante - generiert eine 128-Bit UUID
import { v4 as uuidv4 } from 'uuid'; // für eindeutige IDs
import mongoose from 'mongoose';

const router = express.Router();

const saveUuidSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    }
});
const UuidModel = mongoose.models.UuidList || mongoose.model('UuidList', saveUuidSchema);

router.get("/generate", async (req, res) => {
    const uniqueId = uuidv4(); // Generiert eine eindeutige ID
    try {
        const newUuid = new UuidModel({ uuid: uniqueId });
        await newUuid.save();
        console.log("UUID saved successfully:", uniqueId);
        res.json({ uuid: uniqueId });
    } catch (error) {
        console.error("Error saving UUID:", error);
        res.status(500).json({ error: "Error saving UUID" });
    }
});
export default router; 