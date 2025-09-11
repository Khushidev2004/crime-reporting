import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";

function Dashboard() {
  const [crimeReports, setCrimeReports] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch reports from backend (with dummy fallback)
  useEffect(() => {
    fetch("http://localhost:5000/api/reports")
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          // Dummy reports (testing purpose)
          setCrimeReports([
            { _id: 1, title: "Robbery at Market", category: "Robbery", priority: "High", location: "Delhi", status: "in-progress", date: new Date(), lat: 28.61, lng: 77.20 },
            { _id: 2, title: "Cyber Fraud", category: "Cyber Crime", priority: "Medium", location: "Noida", status: "resolved", date: new Date(), lat: 28.57, lng: 77.32 },
            { _id: 3, title: "Accident Case", category: "Accident", priority: "Low", location: "Gurgaon", status: "in-progress", date: new Date(), lat: 28.47, lng: 77.03 }
          ]);
        } else {
          setCrimeReports(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching reports:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Chart Data
  const categoryCounts = crimeReports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.keys(categoryCounts).map(key => ({
    name: key,
    value: categoryCounts[key],
  }));

  const COLORS = ["#2563eb", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

  if (loading) {
    return <div className="loader">Loading Dashboard...</div>;
  }

  return (
    <div className="dashboard-container">
      <h2>📊 Police / Admin Dashboard</h2>

      {/* Stats Cards */}
      <div className="stats-cards">
        <div className="card total-crimes">
          <h3>Total Crimes</h3>
          <p>{crimeReports.length}</p>
        </div>
        <div className="card high-priority">
          <h3>High Priority</h3>
          <p>{crimeReports.filter(c => c.priority === "High").length}</p>
        </div>
        <div className="card in-progress">
          <h3>In Progress</h3>
          <p>{crimeReports.filter(c => c.status === "in-progress").length}</p>
        </div>
        <div className="card resolved">
          <h3>Resolved</h3>
          <p>{crimeReports.filter(c => c.status === "resolved").length}</p>
        </div>
      </div>

      {/* Chart */}
      <h3>Crime Category Distribution</h3>
      <div className="chart-container">
        {chartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="no-data">No category data available</p>
        )}
      </div>

      {/* Reports Table */}
      <h3>Crime Reports Table</h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Location</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {crimeReports.length > 0 ? (
              crimeReports.map(report => (
                <tr key={report._id}>
                  <td>{report.title}</td>
                  <td>{report.category}</td>
                  <td>{report.priority}</td>
                  <td>{report.location}</td>
                  <td>{report.status}</td>
                  <td>{new Date(report.date).toLocaleDateString()}</td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6">No reports found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Map */}
      <h3>Crime Map</h3>
      <div className="map-container">
        <MapContainer center={[28.6139, 77.209]} zoom={12} style={{ height: "400px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {crimeReports.map(report => (
            <Marker key={report._id} position={[report.lat || 28.61, report.lng || 77.20]}>
              <Popup>
                <strong>{report.title}</strong><br />
                {report.category} - {report.priority}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Dashboard;
