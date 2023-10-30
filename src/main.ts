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

// var whitelist = [
//   "http://localhost:3001",
//   "http://localhost:3000",
//   "https://zql2g0k4-3001.brs.devtunnels.ms",
// ];
// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };
const corsOptions = {
  origin: [
    "http://localhost:3001",
    "http://localhost:3000",
    "https://zql2g0k4-3001.brs.devtunnels.ms",
    "http://192.168.100.32:3001",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(express.json());

app.listen(port, () =>
  console.log(`Listening at http://${SERVER.HOST}:${port}`)
);
app.use(router);
app.get("/", (req: Request, res: any) => res.json(req.body).status(200));

export default app;
