import { Router } from "express";
import { generateAccessToken, validateToken } from "../crypto/jwt";
const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  // console.log]);

  console.log("User: " + username, "\nPassword: " + password);

  if (username === "admin" && password === "admin") {
    const user = {
      id: 1,
      username: "admin",
      email: "admin@admin.com",
    };
    const accessToken = generateAccessToken(user);
    res.header("authorization", accessToken).json({
      message: "user logged in",
      accessToken,
      ip: req.ip,
    });
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

export default router;
