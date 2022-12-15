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
import { router } from "src/router";

const app = express();
const { SERVER } = CONFIG;
const port = SERVER.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:3001",
};

app.listen(port, () =>
  console.log(`Listening at http://${SERVER.HOST}:${port}`)
);

app.use(morgan("dev"));
app.use(cors(corsOptions));
app.use(express.json());

app.use(router);
app.get("/", (req: Request, res: any) => res.json(req.body).status(200));

export default app;
