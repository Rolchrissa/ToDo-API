import { Router } from "express";
import { registerUser } from "src/services/user/register";
import { validatePassword } from "../../utils/crypto/bcrypt";
import { generateAccessToken } from "../../utils/crypto/jwt";
import { getUser } from "../../utils/database/user";

import jwt from "jsonwebtoken";
import config from "src/config";
const { JWT } = config;

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
          accessToken: accessToken.accessToken,
          refreshToken: accessToken.refreshToken,
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

//refrecsh token
router.post("/token", (req, res) => {
  const refreshToken = req.body.token.refreshToken;
  console.log({ body: req.body });
  if (!refreshToken) return res.sendStatus(401);
  // if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, JWT.REFRESH_SECRET, (err, user) => {
    console.log({ refreshToken, err });
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ username: user.username });
    res.json({ ...accessToken });
  });
});

export default router;
