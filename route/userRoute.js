import express from "express";
import { userSignup, userLogin } from "../controller/userController.js";

const router = express.Router();

// Signup Route
router.post("/signup", userSignup);

// Login Route
router.post("/login", userLogin);

export default router;
