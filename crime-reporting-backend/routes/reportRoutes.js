import express from "express";
import { getReports, createReport } from "../controllers/reportController.js";

const router = express.Router();

// GET all reports
router.get("/", getReports);

// POST new report
router.post("/", createReport);

export default router;
