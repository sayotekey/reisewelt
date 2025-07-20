import mongoose from "mongoose";

const saveUuidSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
    unique: true,
  },
  hotels: [{ type: Array }],
  flag: {
    type: Boolean,
    default: false,
  },
});
const UuidModel = mongoose.model("UuidLists", saveUuidSchema);

export default UuidModel;
