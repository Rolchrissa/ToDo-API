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

import express from "express";
import morgan from "morgan";
import { PORT } from "../config/constant";
import auth from "./auth/router";
import health from "./health/index";

const app = express();
const port = PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const body = req.body;
  res.json(body);
  res.status(200);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

app.use("/health", health);
app.use("/auth", auth);
