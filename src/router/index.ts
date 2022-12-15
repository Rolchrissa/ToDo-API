import { Router } from "express";
import auth from "./auth";
import health from "./health";
import items from "./items";
import profile from "./profile";

const router = Router();

router.use("/auth", auth);
router.use("/health", health);
router.use("/profile", profile);
router.use("/items", items);

export { router };
