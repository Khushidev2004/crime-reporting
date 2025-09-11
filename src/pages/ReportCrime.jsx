import React, { useState } from "react";
import "./ReportCrime.css";
import { useNavigate } from "react-router-dom";

function ReportCrime() {
  const [reporterName, setReporterName] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [location, setLocation] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [evidence, setEvidence] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleFileChange = (e) => setEvidence(e.target.files[0]);

  const useBrowserLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported by browser");
      return;
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      setLat(pos.coords.latitude);
      setLng(pos.coords.longitude);
      setError("");
    }, (err) => {
      setError("Unable to get location: " + err.message);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !category || !location) {
      setError("Please fill title, category and location");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("reporterName", reporterName);
      formData.append("anonymous", anonymous);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("priority", priority);
      formData.append("location", location);
      if (lat) formData.append("lat", lat);
      if (lng) formData.append("lng", lng);
      if (evidence) formData.append("evidence", evidence);

      const res = await fetch("/api/reports", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to submit report");
      } else {
        setSuccess("Report submitted successfully");
        // optional: redirect to dashboard after 1.2s
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="report-form-container">
      <div className="report-box">
        <h2>🚨 Report a Crime</h2>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <form onSubmit={handleSubmit} className="report-form">
          <label>
            <input type="checkbox" checked={anonymous} onChange={() => setAnonymous(!anonymous)} />
            Report Anonymously
          </label>

          {!anonymous && (
            <input
              type="text"
              placeholder="Your name"
              value={reporterName}
              onChange={(e) => setReporterName(e.target.value)}
            />
          )}

          <input
            type="text"
            placeholder="Crime Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Describe the incident..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Theft">Theft</option>
            <option value="Assault">Assault</option>
            <option value="Fraud">Fraud</option>
            <option value="Harassment">Harassment</option>
            <option value="Robbery">Robbery</option>
            <option value="Accident">Accident</option>
            <option value="Other">Other</option>
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <input
            type="text"
            placeholder="Location (address / area)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <div className="geo-row">
            <input
              type="number"
              step="any"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
            />
            <input
              type="number"
              step="any"
              placeholder="Longitude"
              value={lng}
              onChange={(e) => setLng(e.target.value)}
            />
            <button type="button" className="geo-btn" onClick={useBrowserLocation}>Use my location</button>
          </div>

          <label className="file-label">
            Evidence (image/pdf) - optional
            <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} />
          </label>

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportCrime;
