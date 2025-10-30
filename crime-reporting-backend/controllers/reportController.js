import Report from "../models/Report.js";
import fs from "fs";
import path from "path";

// GET /api/reports - Police/Admin access
export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    console.error("GetReports error:", error);
    res.status(500).json({ message: "Failed to fetch reports", error: error.message });
  }
};

// POST /api/reports - Public (anonymous allowed)
export const createReport = async (req, res) => {
  try {
    const {
      reporterName,
      anonymous,
      title,
      description,
      category,
      priority,
      location,
      lat,
      lng,
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
      status: "Pending", // Default aligned to frontend's pending
    };

    // If file uploaded (evidence), save path in DB
    if (req.file) {
      reportData.evidence = `/uploads/${req.file.filename}`;
    }

    const newReport = new Report(reportData);
    await newReport.save();

    res.status(201).json(newReport);
  } catch (error) {
    console.error("CreateReport error:", error);
    res.status(400).json({ message: "Failed to create report", error: error.message });
  }
};

// PUT /api/reports/:id/status - Police/Admin update status
export const updateReportStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "In Progress", "Resolved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updated = await Report.findByIdAndUpdate(id, { status }, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json(updated);
  } catch (error) {
    console.error("UpdateReportStatus error:", error);
    res.status(400).json({ message: "Failed to update status", error: error.message });
  }
};

// DELETE /api/reports/:id - Admin only
export const deleteReport = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Report.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Report not found" });
    }

    // Delete file from uploads folder if exists
    if (deleted.evidence) {
      const filePath = path.join(process.cwd(), deleted.evidence);
      fs.unlink(filePath, (err) => {
        if (err) console.warn("Evidence file delete failed:", err.message);
      });
    }

    res.json({ message: "Report deleted successfully" });
  } catch (error) {
    console.error("DeleteReport error:", error);
    res.status(500).json({ message: "Failed to delete report", error: error.message });
  }
};
