import mongoose from "mongoose";
import config from "src/config";
import { Item } from "src/models/item";
import { v4 as uuidv4 } from "uuid";
const { MONGODB } = config;
mongoose.set("strictQuery", true);

const getItems = async (username: string) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    const item = await Item.find({ username: username });
    console.log({ username, item });
    return item;
  } catch (error) {
    console.log(error);
    return [{ message: "error" }];
  }
};

const createItem = async (item_data: any) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    const existItem = await Item.findOne({
      username: item_data.username,
      name: item_data.name,
    });
    if (existItem) {
      throw new Error("item already exists");
    }
    const item = new Item({
      id: uuidv4(),
      username: item_data.username,
      name: item_data.name,
      isDone: item_data.isDone,
      expireAt: item_data.expireAt,
      description: item_data.description,
    });
    await item.save();
    console.log("item created");
    return item;
  } catch (error: any) {
    console.log(
      `item from ${item_data.username} already exists \n` +
        JSON.stringify(item_data)
    );

    return false;
  }
};

const getOneItem = async (username: string, name: string) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    const item = await Item.findOne({ username: username, name: name });

    return item;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const updateItem = async (item, newItem) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    await Item.findOneAndUpdate({ id: item.id }, newItem);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
const deleteItem = async (item) => {
  try {
    await mongoose.connect(`${MONGODB.URI}`);
    await Item.findOneAndDelete({ id: item.id });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { createItem, deleteItem, getItems, getOneItem, updateItem };
