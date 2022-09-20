const mongoose = require("mongoose");
import { MONGO_URI } from "../../../config/constant";
import { User } from "./model";

export const createUser = async (user_data) => {
  try {
    await mongoose.connect(`${MONGO_URI}`);

    const user = new User({
      id: user_data.id,
      username: user_data.username,
      email: user_data.email,
      token: "token",
      password: user_data.password,
      img: "",
    });
    await user.save();
    console.log("user created");
    return true;
  } catch (error: any) {
    console.log(error.code);
    if (error.code === 11000) {
      console.log("user already exists");
    }
    return false;
  }
};

export const getUser = async (username) => {
  try {
    await mongoose.connect(`${MONGO_URI}`);
    const user = await User.findOne({ username });
    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};
