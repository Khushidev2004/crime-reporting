const Alert = require("../models/Alert");

// Get alerts with optional filtering
exports.getAlerts = async (req, res) => {
  try {
    const { type, unreadOnly } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (unreadOnly === "true") filter.read = false;

    const alerts = await Alert.find(filter).sort({ createdAt: -1 });
    res.json(alerts);
  } catch (error) {
    res.status(500).json({ error: "Server error while fetching alerts" });
  }
};

// Create a new alert
exports.createAlert = async (req, res) => {
  try {
    const { type, title, description, location, severity } = req.body;
    const newAlert = new Alert({ type, title, description, location, severity });
    const savedAlert = await newAlert.save();
    res.status(201).json(savedAlert);
  } catch (error) {
    res.status(500).json({ error: "Server error while creating alert" });
  }
};

// Mark alert as read
exports.markAsRead = async (req, res) => {
  try {
    const alertId = req.params.id;
    const updatedAlert = await Alert.findByIdAndUpdate(alertId, { read: true }, { new: true });
    if (!updatedAlert) return res.status(404).json({ error: "Alert not found" });
    res.json(updatedAlert);
  } catch (error) {
    res.status(500).json({ error: "Server error while updating alert" });
  }
};
