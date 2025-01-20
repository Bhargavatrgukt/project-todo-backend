import * as User from "../model/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middleware/asyncHandler.js";

//user signup

export const userSignup = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user already exists
  const existingUser = await User.getUserByUserMail(email);
  if (existingUser.length !== 0) {
    res.status(400).json({ message: "User email already exists" });
    return;
  }

  // Validate password length
  if (password.length < 6) {
    res.status(400).json({ message: "Password is too short" });
    return;
  }

  // Hash password and save user
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.createUser(name, email, hashedPassword);
  console.log(user);
  const userId = Number(user.lastInsertRowid);
  const payload = { id: userId };
  const token = jwt.sign(payload, process.env.SECRET_KEY || "defaultSecret");
  res.cookie("authToken", token);
  res.status(201).json({ message: "User created successfully", token });
});

// User Login
export const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const user = await User.getUserByUserMail(email);
  if (!user) {
    res.status(400).json({ message: "Invalid user" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user[0].password);
  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid password" });
    return;
  }

  // Generate JWT token
  const payload = { id: Number(user[0].id) };
  const token = jwt.sign(payload, process.env.SECRET_KEY || "defaultSecret");
  res.cookie("authToken", token);
  res.status(200).json({ message: "Login successful", token });
});
