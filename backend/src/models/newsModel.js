// models/newsModel.js
import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
  title: String,
  content: String,
  image: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const News = mongoose.model("News", NewsSchema);
export default News;
