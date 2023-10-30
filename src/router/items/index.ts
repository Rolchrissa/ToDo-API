import express from "express";
import { validateToken, validateUser } from "src/utils/crypto/jwt";
import {
  createItem,
  deleteItem,
  getItems,
  getOneItem,
  updateItem,
} from "src/utils/database/items";

const router = express.Router();

router.get("/all", validateToken, validateUser, async (req: any, res: any) => {
  res.json(await getItems(req.headers.username)).status(200);
});
router.post("/", validateToken, validateUser, async (req, res) => {
  const { username } = req.headers;
  const { name, description, expireAt, isDone } = req.body;
  if (!username) res.json({ message: "username is required" }).status(400);
  if (!name) res.json({ message: "name is required" }).status(400);
  try {
    const item = await createItem({
      name,
      description,
      expireAt,
      isDone,
      username,
    });

    if (item) res.json({ message: "created", item }).status(200);
    else throw new Error("item already exists");
  } catch (err: any) {
    console.log(err);
    res.json({ message: err.message }).status(500);
  }
});

router.get("/:name", validateToken, validateUser, async (req, res) => {
  const { name } = req.params;
  const { username } = req.body;
  res.json(await getOneItem(username, name)).status(200);
});

router.put("/:name", validateToken, validateUser, async (req, res) => {
  const { name } = req.params;
  const { isDone, newName, description } = req.body;
  const { username } = req.headers;
  const item = await getOneItem(username, name);
  if (item) {
    const newItem = {
      name: newName,
      isDone: isDone,
      description: description,
      updatedAt: Date.now(),
    };
    if (await updateItem(item, newItem)) res.json(newItem).status(200);
  } else {
    res.json({ message: "error" }).status(500);
  }
});

router.delete("/:name", validateToken, validateUser, async (req, res) => {
  const { name } = req.params;
  const { username } = req.headers;
  const item = await getOneItem(username, name);
  if (item) {
    if (await deleteItem(item)) res.json({ message: "deleted" }).status(200);
  } else {
    res.json({ message: "error" }).status(500);
  }
});

export default router;
