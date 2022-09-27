import { config as envConfig } from "dotenv";
import * as validate from "./utils/validators";
envConfig();

const defaults = {
  SERVER: {
    PORT: 3000,
    CORS: "localhost:3001",
  },
  MONGODB: {
    DB: "test",
    USER: "root",
    PASSWORD: "example",
    HOST: "localhost",
    PORT: 27017,
    PROTOCOL: "mongodb",
    URI: "mongodb://localhost:27017",
  },
  JWT_SECRET: "secret",
  SENDGRID: {
    API_KEY: "SG.1234567890",
    API_EMAIL: "example@example.com",
  },
};

export = {
  SERVER: {
    PORT: validate.isPort(process.env.PORT) || defaults.SERVER.PORT,
    CORS: process.env.WEB_URL || defaults.SERVER.CORS,
  },
  MONGODB: {
    DB: process.env.MONGO_DB || defaults.MONGODB.DB,
    USER: process.env.MONGO_USER || defaults.MONGODB.USER,
    PASSWORD: process.env.MONGO_PASSWORD || defaults.MONGODB.PASSWORD,
    HOST: process.env.MONGO_HOST || defaults.MONGODB.HOST,
    PORT: validate.isPort(process.env.MONGO_PORT) || defaults.MONGODB.PORT,
    PROTOCOL: process.env.MONGO_PROTOCOL || defaults.MONGODB.PROTOCOL,
    URI:
      `${process.env.MONGO_PROTOCOL}://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB}` ||
      defaults.MONGODB.URI,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || defaults.JWT_SECRET,
  },
  SENDGRID: {
    API_KEY: process.env.SENDGRID_API_KEY || defaults.SENDGRID.API_KEY,
    API_EMAIL: process.env.SENDGRID_API_EMAIL || defaults.SENDGRID.API_EMAIL,
  },
};
