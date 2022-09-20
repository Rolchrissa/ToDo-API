import mongoose from "mongoose";

const user = new mongoose.Schema({
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  img: String,
});

export const User = mongoose.model("User", user);
