import Report from "../models/Report.js";
import path from "path";

// GET /api/reports
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error("GetReports error:", err);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

// POST /api/reports
export const createReport = async (req, res) => {
  try {
    // multer puts file info in req.file
    const {
      reporterName, anonymous, title, description, category,
      priority, location, lat, lng
    } = req.body;

    const reportData = {
      reporterName: reporterName || "",
      anonymous: anonymous === "true" || anonymous === true,
      title,
      description,
      category,
      priority,
      location,
      lat: lat ? parseFloat(lat) : undefined,
      lng: lng ? parseFloat(lng) : undefined,
      status: "pending",
    };

    if (req.file) {
      // store relative URL path
      reportData.evidence = `/uploads/${req.file.filename}`;
    }

    const newReport = new Report(reportData);
    await newReport.save();

    res.status(201).json(newReport);
  } catch (err) {
    console.error("CreateReport error:", err);
    res.status(400).json({ message: "Failed to create report", error: err.message });
  }
};
