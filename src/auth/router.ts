import { Router } from "express";
import { generateAccessToken, validateToken } from "../crypto/jwt";
import { createUser, getUser } from "../database/user";
const router = Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const user = await getUser(username);
  if (!user) return res.send({ error: "user not found" }).status(404);
  if (username === user?.username && password === user.password) {
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
          email: user.email,
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

router.get("/profile", validateToken, (req, res) => {
  res.json({
    message: "user profile",
    user: req.user,
  });
});

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "Bad Request" });
  }
  const user = await getUser(username);
  if (user) return res.json({ error: "user already exists" }).status(400);
  let user_data = {
    username,
    email,
  };
  const token = generateAccessToken(user_data);
  const newUser = await createUser({
    username,
    email,
    password,
    token,
    img: "",
  });
  if (newUser) {
    res.status(201).json({
      message: "user created",
    });
  } else {
    res.status(400).json({
      message: "user not created",
    });
  }
});

export default router;
