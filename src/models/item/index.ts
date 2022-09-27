import mongoose from "mongoose";

const item = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: { type: String },
  name: { type: String },
  isDone: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Item = mongoose.model("Item", item);
