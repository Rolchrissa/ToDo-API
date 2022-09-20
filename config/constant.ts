import * as dotenv from "dotenv";
import * as validate from "./validators";
dotenv.config();

export const PORT = validate.isPort(process.env.PORT) || 3000;
export const MONGO_DB = process.env.MONGO_DB || "test";
export const MONGO_USER = process.env.MONGO_USER || "root";
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "example";
export const MONGO_HOST = process.env.MONGO_HOST || "localhost";
export const MONGO_PORT = validate.isPort(process.env.MONGO_PORT) || 27017;
export const MONGO_PROTOCOL = process.env.MONGO_PROTOCOL || "mongodb";
export const MONGO_URI =
  `${MONGO_PROTOCOL}://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DB}` ||
  "mongodb://localhost:27017";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "SG.1234567890";
export const SENDGRID_API_EMAIL =
  process.env.SENDGRID_API_EMAIL || "example@example.com";
