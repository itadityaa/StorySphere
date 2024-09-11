import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  content: {
    type: Object,
    required: true,
  },
  coverImg: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  rating: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Story = mongoose.model("Story", storySchema);
