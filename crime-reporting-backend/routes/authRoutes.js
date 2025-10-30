import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { registerUser, loginUser, getMe, updateUser } from "../controllers/authController.js";
import { protect, authorizeUsers } from "../middleware/authMiddleware.js";

const router = express.Router();

// Temporary route for admin password reset (use once, then remove for security!)
router.post("/reset-admin-password", async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email and newPassword are required." });
  }
  const user = await User.findOne({ email, role: "admin" });
  if (!user) return res.status(404).json({ message: "Admin not found" });

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(newPassword, salt);
  await user.save();

  res.json({ message: "Admin password reset successful!" });
});

// Register User
router.post("/register", registerUser);

// Login User
router.post("/login", loginUser);

// Get logged-in user's info (protected)
router.get("/me", protect, getMe);

// Get all users (admin only)
router.get("/users", protect, authorizeUsers, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    console.error("Fetching users failed:", error);
    res.status(500).json({ message: "Server error fetching users" });
  }
});

// Update User (admin only)
router.put("/users/:id", protect, authorizeUsers, updateUser);

// Delete User (admin only)
router.delete("/users/:id", protect, authorizeUsers, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("User deletion failed:", error);
    res.status(500).json({ message: "Server error deleting user" });
  }
});

export default router;
