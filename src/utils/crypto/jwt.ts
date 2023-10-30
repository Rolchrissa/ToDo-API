import jwt from "jsonwebtoken";
import CONFIG from "src/config";

const { JWT } = CONFIG;

export const generateAccessToken = (user: any) => {
  return generateTokens(user);
};

export const generateTokens = (user: any) => {
  const accessToken = jwt.sign(user, JWT.SECRET, { expiresIn: "1h" });
  const refreshToken = jwt.sign(user, JWT.REFRESH_SECRET, { expiresIn: "7d" });

  return { accessToken, refreshToken };
};

export const validateRefreshToken = (refreshToken: string) => {
  try {
    const user = jwt.verify(refreshToken, JWT.REFRESH_SECRET);
    return user;
  } catch (err) {
    console.log("invalid refresh token: ", JSON.stringify(err, null, 2));
    return null;
  }
};

export const validateToken = (req: any, res: any, next) => {
  const accessToken = req.headers["authorization"];
  console.log("accessToken!!: ", accessToken);
  if (!accessToken) {
    return res.status(401).json({
      message: "Access Denied",
    });
  }
  jwt.verify(accessToken, JWT.SECRET, (err, user) => {
    if (err) {
      console.log("invalid token: ", JSON.stringify(err, null, 2));
      if (err.name === "TokenExpiredError") {
        return res.status(498).json({
          message: "Token Expired",
        });
      }

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
  const { username } = req.headers;
  if (user.username !== username) {
    return res.status(404).json({
      message: "Invalid User",
    });
  }
  req.username = username;
  next();
};
