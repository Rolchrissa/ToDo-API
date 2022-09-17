import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../config/constant";
// import { user } from "../types/types";

export const generateAccessToken = (user: any) => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: "90m" });
};

export const validateToken = (req, res, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }
  jwt.verify(accessToken, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
    req.user = user; //esto puede fallar

    next();
  });
};
