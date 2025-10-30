// app.js (ya server.js)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
// import analyticsRoutes from "./routes/analyticsRoutes.js"; // Uncomment if file exists

dotenv.config();

connectDB();

const app = express();

// CORS config (for cookies: frontend url use karo, warna default bhi chalega)
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

// Static file serving
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
// app.use("/api/analytics", analyticsRoutes); // Uncomment if using

app.get("/", (req, res) => res.send("API running"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
