// models/newsModel.js
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  content: [
  {
    type: {
      type: String,
      enum: ["paragraph", "image"], // Можно потом добавить "heading", "list" и т.д.
      required: true,
    },
    text: String, // для paragraph
    url: String,  // для image
  }
],
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", NewsSchema);
export default News;
