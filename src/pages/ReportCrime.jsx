import { useState } from "react";
import "./ReportCrime.css";

function ReportCrime() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [evidence, setEvidence] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFileChange = (e) => {
    setEvidence(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !location || !category) {
      setError("All fields except evidence are required!");
      setSuccess("");
      return;
    }

    setError("");
    setLoading(true);

    // Fake API simulation
    setTimeout(() => {
      setSuccess("✅ Crime reported successfully!");
      setLoading(false);

      // Reset form
      setTitle("");
      setDescription("");
      setLocation("");
      setCategory("");
      setPriority("Medium");
      setEvidence(null);
    }, 2000);
  };

  return (
    <div className="report-form-container">
      <div className="report-form">
        <h2>🚨 Report a Crime</h2>

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}

        <form onSubmit={handleSubmit}>
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
          ></textarea>

          <input
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Theft">Theft</option>
            <option value="Assault">Assault</option>
            <option value="Fraud">Fraud</option>
            <option value="Harassment">Harassment</option>
            <option value="Other">Other</option>
          </select>

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="High">High Priority</option>
          </select>

          <div className="file-upload">
            <label>Upload Evidence (optional):</label>
            <input type="file" onChange={handleFileChange} />
          </div>

          {evidence && (
            <p className="file-preview">📎 {evidence.name}</p>
          )}

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit Report"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ReportCrime;
