import * as User from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/asyncHandler.js";

//user signup

export const userSignup = asyncHandler(async (req, res) => {
  const { name, email, password, gender } = req.body;

  // Check if user already exists
  const existingUser = await User.getUserByUsername(name);
  if (existingUser && existingUser.length > 0) {
    res.status(400).json({ message: "User already exists" });
    return;
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400).json({ message: "Password is too short" });
    return;
  }

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(password, 10);
  await User.createUser(name, email, hashedPassword, gender); // Use hashedPassword
  res.status(201).json({ message: "User created successfully" });
});

// User Login
export const userLogin = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  // Check if user exists
  const user = await User.getUserByUsername(name);
  if (!user || user.length === 0) {
    res.status(400).json({ message: "Invalid user" });
    return;
  }

  const userData = Array.isArray(user) ? user[0] : user; // Adjust for your DB response

  const isPasswordValid = await bcrypt.compare(password, userData.password);
  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }

  // Generate JWT token
  const payload = { username: userData.name }; // Adjust key based on your schema
  const token = jwt.sign(payload, process.env.SECRET_KEY || "defaultSecret"); // Add fallback for SECRET_KEY
  res.cookie("authToken", token);
  res.status(200).json({ message: "Login successful", token });
});
