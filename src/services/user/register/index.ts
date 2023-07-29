import { generateAccessToken } from "src/utils/crypto/jwt";
import { getUser } from "src/utils/database/user";
import { createUser } from "./create";

const registerUser = async (req: any, res: any) => {
  const { username, email, password } = req.body;
  // console.log(req.body);

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
};

const activeUser = (req: any, res: any) => {
  const { token } = req.body;
  console.log(token);
  res.status(200).json({
    message: "user activated",
  });
};

export { registerUser, activeUser };
