import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    callback: { type: String, required: true, enum: ["ja", "nein"] },
    phone: { type: String, trim: true },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = mongoose.model("Contact", contactSchema);

export default ContactModel;
