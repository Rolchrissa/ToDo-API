import mongoose from "mongoose";

const user = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  phone: String,
  img: { type: String, default: "no" },
  role: { type: String, default: "user" },
  active: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  token: {
    type: String,
    default: null,
    unique: true,
  }, // token for reset password
  tokenExpire: { type: Date, default: null }, // token expire for reset password
});

export const User = mongoose.model("User", user);
