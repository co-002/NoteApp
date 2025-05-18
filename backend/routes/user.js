import express from "express";
import { register, login, logout, verify } from "../controllers/user.js";
import { authMiddleware } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.get("/verify", authMiddleware, verify);

export default router;
