/**
 *
 * language: typescript
 * path: src\main.ts
 * author: Christopher Roldan Sanchez
 * email: rolchrissa@gmail.con
 * date: 2022-SEP-16
 * version: 1.0.0
 * description: This is the main file of the project
 *
 */

import cors from "cors";
import express from "express";
import morgan from "morgan";
import CONFIG from "src/config";
import auth from "src/router/auth";
import health from "src/router/health";
import items from "src/router/items";
import profile from "src/router/profile";

const app = express();
const { SERVER } = CONFIG;
const port = SERVER.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3001",
};

app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

app.use("/health", health);
app.use("/auth", auth);
app.use("/profile", profile);
app.use("/items", items);

app.get("/", (req, res) => res.json(req.body).status(200));

export default app;
