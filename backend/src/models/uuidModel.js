import mongoose from 'mongoose';


const saveUuidSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true,
        unique: true
    },
    hotels: [{ type: Array }]
});
const UuidModel = mongoose.models.UuidList || mongoose.model('UuidLists', saveUuidSchema);

export default UuidModel;