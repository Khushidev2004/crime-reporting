import express from "express";
import { getSummary, listReports } from "../controllers/analyticsController.js";
// optionally import auth middleware if you want to protect routes
// import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Public summary (or protect with authMiddleware)
router.get("/summary", /* authMiddleware, */ getSummary);

// List reports with query
router.get("/reports", /* authMiddleware, */ listReports);

export default router;
