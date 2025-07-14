import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: [{
    type: {
      type: String,
      enum: ['paragraph', 'image'],
      required: true
    },
    text: String,
    url: String
  }],
  image: {
    type: String,
    required: true
  },
  language: {
    type: String,
    enum: ['de', 'en'],
    default: 'de'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('News', newsSchema);