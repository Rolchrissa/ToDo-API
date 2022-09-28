import jwt from "jsonwebtoken";
import CONFIG from "src/config";

const { JWT } = CONFIG;

export const generateAccessToken = (user: any) => {
  return jwt.sign(user, JWT.SECRET, { expiresIn: "90m" });
};

export const validateToken = (req: any, res: any, next) => {
  const accessToken = req.headers["authorization"];

  if (!accessToken) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }
  jwt.verify(accessToken, JWT.SECRET, (err, user) => {
    if (err) {
      return res.status(498).json({
        message: "Invalid Token",
      });
    }
    req.user = user;
    next();
  });
};

export const validateUser = (req: any, res: any, next) => {
  const { user } = req;
  const { username } = req.body;
  if (user.username !== username) {
    return res.status(418).json({
      message: "Invalid User",
    });
  }
  next();
};
