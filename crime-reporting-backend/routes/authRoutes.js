import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import User from "../models/User.js"; // 👈 All users ke liye import

const router = express.Router();

// ✅ Register (Signup)
router.post("/register", registerUser);

// ✅ Login
router.post("/login", loginUser);

// ✅ Get all users (Compass/CMD check)
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

export default router;
