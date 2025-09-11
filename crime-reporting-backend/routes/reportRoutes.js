import express from "express";
import multer from "multer";
import { getReports, createReport } from "../controllers/reportController.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// Multer storage config
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadFolder = path.join(__dirname, "..", "uploads");

// ensure uploads folder exists (optional)
import fs from "fs";
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `${unique}${ext}`);
  }
});

const upload = multer({ storage });

// GET all reports
router.get("/", getReports);

// POST create report (with optional evidence file field name = "evidence")
router.post("/", upload.single("evidence"), createReport);

export default router;
