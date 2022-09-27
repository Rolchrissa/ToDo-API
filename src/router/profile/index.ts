import { Router } from "express";
import { validateToken } from "src/utils/crypto/jwt";
import { getPublicUser } from "src/utils/database/user";

const router = Router();

router.get("/:username", validateToken, async (req, res) => {
  const { username } = req.params;
  const user = await getPublicUser(username);
  if (!user) return res.send({ error: "user not found" }).status(404);
  res.json({
    message: "user profile",
    user: user,
  });
});

export default router;
