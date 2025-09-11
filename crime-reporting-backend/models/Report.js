import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
  location: { type: String, required: true },
  status: { type: String, enum: ["in-progress", "resolved"], default: "in-progress" },
  date: { type: Date, default: Date.now },
  lat: Number,
  lng: Number
});

const Report = mongoose.model("Report", reportSchema);

export default Report;
