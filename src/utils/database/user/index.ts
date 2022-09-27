import mongoose from "mongoose";
import CONFIG from "src/config";
import { User } from "src/models/user/model";
import { hashPassword } from "src/utils/crypto/bcrypt";
import { v4 as uuidv4 } from "uuid";
const { MONGODB } = CONFIG;
export const createUser = async (user_data: any) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    user_data.password = await hashPassword(user_data.password);
    const user = new User({
      id: uuidv4(),
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
      console.log(error);
    }
    return false;
  }
};

export const getUser = async (username: string) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    const user = await User.findOne({ username: username });

    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getUserWithOutPassword = async (username: string) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    const user = await User.findOne({ username: username }).select("-password");

    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getPublicUser = async (username: string) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    const user = await User.findOne({ username: username }).select(
      "username img role id -_id"
    );

    return user;
  } catch (error) {
    console.log(error);
    return false;
  }
};
