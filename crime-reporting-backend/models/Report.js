import mongoose from "mongoose";
const reportSchema = new mongoose.Schema({
  reporterName: { type: String },
  anonymous: { type: Boolean, default: true },
  title: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  location: { type: String, required: true },
  lat: { type: Number },
  lng: { type: Number },
  status: { type: String, enum: ["Pending", "In Progress", "Resolved"], default: "Pending" },
  evidence: { type: String },
  date: { type: Date, default: Date.now }
}, { timestamps: true });
const Report = mongoose.model("Report", reportSchema);
export default Report;
