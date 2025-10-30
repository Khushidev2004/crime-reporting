const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["crime", "safety", "emergency"],
    required: true
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, default: "" },
  severity: {
    type: String, 
    enum: ["low", "medium", "high", "critical"], 
    default: "low"
  },
  time: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("Alert", alertSchema);
