import * as dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
export const MONGO_DB = process.env.MONGO_DB || "test";
export const MONGO_USER = process.env.MONGO_USER || "root";
export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "example";
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
