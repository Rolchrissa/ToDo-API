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

router.get("/all", validateToken, validateUser, async (req, res) => {
  res.json(await getItems(req.body.username)).status(200);
});
router.post("/", validateToken, validateUser, async (req, res) => {
  if (await createItem(req.body)) res.json(req.body).status(200);
  else res.json({ message: "error" }).status(500);
});

router.get("/:name", validateToken, validateUser, async (req, res) => {
  const { name } = req.params;
  const { username } = req.body;
  res.json(await getOneItem(username, name)).status(200);
});

router.put("/:name", validateToken, validateUser, async (req, res) => {
  const { name } = req.params;
  const { username, isDone, newName } = req.body;
  const item = await getOneItem(username, name);
  if (item) {
    const newItem = {
      name: newName,
      isDone: isDone,
      updatedAt: Date.now(),
    };
    if (await updateItem(item, newItem)) res.json(newItem).status(200);
  } else {
    res.json({ message: "error" }).status(500);
  }
});

router.delete("/:name", validateToken, validateUser, async (req, res) => {
  const { name } = req.params;
  const { username } = req.body;
  const item = await getOneItem(username, name);
  if (item) {
    if (await deleteItem(item)) res.json({ message: "deleted" }).status(200);
  } else {
    res.json({ message: "error" }).status(500);
  }
});

export default router;
