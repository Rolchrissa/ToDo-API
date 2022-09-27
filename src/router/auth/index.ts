import { Router } from "express";
import { registerUser } from "src/services/user/register";
import { validatePassword } from "../../utils/crypto/bcrypt";
import { generateAccessToken, validateToken } from "../../utils/crypto/jwt";
import { getPublicUser, getUser } from "../../utils/database/user";
const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const user = await getUser(username);
  if (!user) return res.send({ error: "user not found" }).status(404);
  if (
    username === user.username &&
    (await validatePassword(password, user?.password))
  ) {
    const User = {
      id: user._id,
      username,
      email: user.email,
      img: user.img,
    };
    const accessToken = generateAccessToken(User);
    res
      .header("authorization", accessToken)
      .json({
        status: "success",
        account: {
          id: user.id,
          username: user.username,
          accessToken,
          img: user.img,
        },
      })
      .status(200);
  } else {
    res.status(401).json({
      message: "Invalid credentials",
    });
  }
});

router.post("/register", async (req, res) => {
  registerUser(req, res);
});

export default router;
