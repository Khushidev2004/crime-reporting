import React, { useState, useEffect, useMemo } from "react";

import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "leaflet/dist/leaflet.css";
import "./Dashboard.css";

import { getUserFromToken } from "../utils/auth";
import { logoutUser } from "../utils/auth";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [crimeReports, setCrimeReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const navigate = useNavigate();

  

  // For view/edit modals and download
  const [viewReport, setViewReport] = useState(null);
  const [editReport, setEditReport] = useState(null);
  const [editFields, setEditFields] = useState({});

  // Yahan niche add karo USERS TABLE KE LIYE STATES (React hooks)
  const [userSearch, setUserSearch] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("all");
  const [userSortField, setUserSortField] = useState(null);
  const [userSortAsc, setUserSortAsc] = useState(true);
  const [currentUserPage, setCurrentUserPage] = useState(1);
  const USERS_PER_PAGE = 5;
  const [editUser, setEditUser] = useState(null);
  const [editUserFields, setEditUserFields] = useState({ name: "", email: "", role: "" });

  // UseMemo for filtered, searched, sorted users
  const filteredUsers = useMemo(() => {
    let data = [...users];
    if (userRoleFilter !== "all") {
      data = data.filter(u => u.role === userRoleFilter);
    }
    if (userSearch.trim() !== "") {
      data = data.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase()));
    }
    if (userSortField) {
      data.sort((a, b) => {
        const aVal = (a[userSortField] || "").toLowerCase();
        const bVal = (b[userSortField] || "").toLowerCase();
        if (aVal < bVal) return userSortAsc ? -1 : 1;
        if (aVal > bVal) return userSortAsc ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [users, userSearch, userRoleFilter, userSortField, userSortAsc]);

  // Pagination
  const userTotalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice((currentUserPage - 1) * USERS_PER_PAGE, currentUserPage * USERS_PER_PAGE);

  // Sorting handler
  const onUserSort = (field) => {
    if (userSortField === field) {
      setUserSortAsc(prev => !prev);
    } else {
      setUserSortField(field);
      setUserSortAsc(true);
    }
  };

  // Edit user modal open/close handlers
  const openEditUserModal = (user) => {
    setEditUser(user);
    setEditUserFields({ name: user.name, email: user.email, role: user.role });
  };
  const closeEditUserModal = () => {
    setEditUser(null);
    setEditUserFields({ name: "", email: "", role: "" });
  };

  // Edit input change handler
  const handleEditUserChange = (field, value) => {
    setEditUserFields(prev => ({ ...prev, [field]: value }));
  };

  // Save user update to backend
  const handleSaveUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/auth/users/${editUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(editUserFields)
      });
      if (res.ok) {
        const updated = await res.json();
        setUsers(prev => prev.map(u => u._id === updated._id ? updated : u));
        closeEditUserModal();
      }
    } catch (err) {
      console.error("Error updating user:", err);
    }
  };

  // Delete user with confirmation
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/auth/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        setUsers(prev => prev.filter(u => u._id !== id));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };


  const exportCSV = () => {
  const rows = [
    ["Title", "Category", "Priority", "Location", "Status", "Date"],
    ...crimeReports.map((r) => [
      r.title,
      r.category,
      r.priority,
      r.location,
      r.status,
      new Date(r.createdAt).toLocaleDateString(),
    ]),
  ];
  const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "crime_reports.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  // Rest of your existing useEffects and functions remain unchanged

  // ✅ User authentication check
  useEffect(() => {
    const user = getUserFromToken();
    if (!user || (user.role !== "admin" && user.role !== "police")) {
      navigate("/login");
    }
  }, [navigate]);

  // ✅ Fetch reports
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:5000/api/reports", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch reports");

        const data = await res.json();
        setCrimeReports(Array.isArray(data) ? data : []);
        setFilteredReports(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching reports:", err);
        setCrimeReports([]);
        setFilteredReports([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // ✅ Fetch users (Admin only)
  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        // Token expired or invalid
        alert("Session expired. Please log in again.");
        logoutUser(navigate); // yeh aapke utils/auth.js ka function hai
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching users:", err);
      setUsers([]);
    }
  };

  fetchUsers();
}, [navigate]);



  // ✅ Filter & Search
  useEffect(() => {
    let data = [...crimeReports];
    if (search) {
      data = data.filter((r) =>
        r.title?.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (filterStatus !== "all") {
      data = data.filter((r) => r.status === filterStatus);
    }
    setFilteredReports(data);
  }, [search, filterStatus, crimeReports]);

  // ✅ Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reports/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setCrimeReports((prev) =>
          prev.map((r) => (r._id === id ? { ...r, status: updated.status } : r))
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  // ✅ Delete report
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setCrimeReports((prev) => prev.filter((r) => r._id !== id));
      }
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

 

  // ✅ Chart Data
  const categoryCounts = crimeReports.reduce((acc, report) => {
    acc[report.category] = (acc[report.category] || 0) + 1;
    return acc;
  }, {});
  const chartData = Object.keys(categoryCounts).map((key) => ({
    name: key,
    value: categoryCounts[key],
  }));
  const COLORS = ["#2563eb", "#f59e0b", "#10b981", "#ef4444", "#8b5cf6"];

  // ==================
  // ==== VIEW ========
  // ==================
  const handleViewReport = (report) => {
    setViewReport(report);
  };
  const closeViewModal = () => setViewReport(null);

  // ==================
  // ==== EDIT ========
  // ==================
  const handleEditReport = (report) => {
    setEditReport(report._id);
    setEditFields({
      title: report.title,
      category: report.category,
      priority: report.priority,
      location: report.location,
      status: report.status,
    });
  };
  const handleEditChange = (field, value) => {
    setEditFields((f) => ({ ...f, [field]: value }));
  };
  const handleCancelEdit = () => {
    setEditReport(null);
    setEditFields({});
  };
  const handleSaveEdit = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`http://localhost:5000/api/reports/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editFields),
      });
      if (res.ok) {
        const updated = await res.json();
        setCrimeReports((prev) =>
          prev.map((r) => (r._id === id ? { ...r, ...updated } : r))
        );
        handleCancelEdit();
      }
    } catch (err) {
      console.error("Error updating report:", err);
    }
  };

  // ==================
  // = PDF Download ===
  // ==================
  const handleDownloadReport = (report) => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Title", "Category", "Priority", "Location", "Status", "Date"]],
      body: [[
        report.title,
        report.category,
        report.priority,
        report.location,
        report.status,
        new Date(report.createdAt).toLocaleDateString()
      ]]
    });
    doc.save(`report_${report._id}.pdf`);
  };

  if (loading) return <div className="loader">Loading Dashboard...</div>;

  return (
    <div className="dashboard-container">
      <h2>📊 Admin Dashboard</h2>

      {/* Controls */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
        <button onClick={exportCSV}>⬇️ Export CSV</button>
      </div>

      {/* Stats */}
      <div className="stats-cards">
        <div className="card total-crimes">
          <h3>Total Crimes</h3>
          <p>{crimeReports.length}</p>
        </div>
        <div className="card high-priority">
          <h3>High Priority</h3>
          <p>{crimeReports.filter((c) => c.priority === "High").length}</p>
        </div>
        <div className="card in-progress">
          <h3>In Progress</h3>
          <p>{crimeReports.filter((c) => c.status === "in-progress").length}</p>
        </div>
        <div className="card resolved">
          <h3>Resolved</h3>
          <p>{crimeReports.filter((c) => c.status === "resolved").length}</p>
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
                outerRadius={100}
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No category data available</p>
        )}
      </div>

      {/* Crime Reports Table */}
      <h3>Crime Reports</h3>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.length > 0 ? (
              filteredReports.map((report) =>
                editReport === report._id ? (
                  <tr key={report._id} className="row-edit">
                    <td>
                      <input
                        value={editFields.title}
                        onChange={(e) => handleEditChange("title", e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        value={editFields.category}
                        onChange={(e) => handleEditChange("category", e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={editFields.priority}
                        onChange={(e) => handleEditChange("priority", e.target.value)}
                      >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </td>
                    <td>
                      <input
                        value={editFields.location}
                        onChange={(e) => handleEditChange("location", e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        value={editFields.status}
                        onChange={(e) => handleEditChange("status", e.target.value)}
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td>
                      {new Date(report.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button onClick={() => handleSaveEdit(report._id)} className="save-btn">
                        💾 Save
                      </button>
                      <button onClick={handleCancelEdit} className="cancel-btn">
                        ❌ Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr
                    key={report._id}
                    className={
                      report.priority === "High"
                        ? "row-high"
                        : report.priority === "Medium"
                          ? "row-medium"
                          : "row-low"
                    }
                  >
                    <td>{report.title}</td>
                    <td>{report.category}</td>
                    <td>{report.priority}</td>
                    <td>{report.location}</td>
                    <td>
                      <select
                        value={report.status}
                        onChange={(e) =>
                          handleStatusChange(report._id, e.target.value)
                        }
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </td>
                    <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        onClick={() => handleViewReport(report)}
                        className="view-btn"
                      >
                        👁 View
                      </button>
                      <button
                        onClick={() => handleEditReport(report)}
                        className="edit-btn"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDownloadReport(report)}
                        className="download-btn"
                      >
                        ⬇️ Download
                      </button>
                      <button
                        onClick={() => handleDelete(report._id)}
                        className="delete-btn"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="7">No reports found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ===== VIEW MODAL ==== */}
      {viewReport && (
        <div className="modal-backdrop" onClick={closeViewModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>{viewReport.title}</h3>
            <p>
              <strong>Category:</strong> {viewReport.category}<br />
              <strong>Priority:</strong> {viewReport.priority}<br />
              <strong>Location:</strong> {viewReport.location}<br />
              <strong>Status:</strong> {viewReport.status}<br />
              <strong>Date:</strong> {new Date(viewReport.createdAt).toLocaleDateString()}
            </p>
            <button onClick={closeViewModal}>Close</button>
          </div>
        </div>
      )}

      {/* Users Table */}
{/* Users Table Section with full features */}
<h3>👥 Users</h3>

{/* Search and Role filter */}
<div style={{ marginBottom: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
  <input
    type="text"
    placeholder="Search users by name or email"
    value={userSearch}
    onChange={(e) => {
      setUserSearch(e.target.value);
      setCurrentUserPage(1);
    }}
    style={{ padding: "6px 14px", borderRadius: "12px", fontSize: "1rem", border: "2px solid #cbd5e1", flexGrow: 1, maxWidth: "320px" }}
  />
  <select
    value={userRoleFilter}
    onChange={(e) => {
      setUserRoleFilter(e.target.value);
      setCurrentUserPage(1);
    }}
    style={{ padding: "7px 12px", fontSize: "1rem", borderRadius: "12px", border: "2px solid #cbd5e1", minWidth: "160px", cursor: "pointer" }}
  >
    <option value="all">All Roles</option>
    <option value="admin">Admin</option>
    <option value="citizen">Citizen</option>
  </select>
</div>

{/* Users Table */}
<div className="table-container">
  <table>
    <thead>
      <tr>
        <th style={{ cursor: "pointer" }} onClick={() => onUserSort("name")}>
          Name {userSortField === "name" ? (userSortAsc ? "▲" : "▼") : ""}
        </th>
        <th style={{ cursor: "pointer" }} onClick={() => onUserSort("email")}>
          Email {userSortField === "email" ? (userSortAsc ? "▲" : "▼") : ""}
        </th>
        <th style={{ cursor: "pointer" }} onClick={() => onUserSort("role")}>
          Role {userSortField === "role" ? (userSortAsc ? "▲" : "▼") : ""}
        </th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {paginatedUsers.length > 0 ? (
        paginatedUsers.map((u) => (
          <tr key={u._id}>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.role}</td>
            <td>
              <button onClick={() => openEditUserModal(u)} className="edit-btn">
                ✏️ Edit
              </button>
              <button onClick={() => handleDeleteUser(u._id)} className="delete-btn">
                🗑️ Delete
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="4" style={{ textAlign: "center" }}>
            No users found
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

{/* Pagination control */}
{userTotalPages > 1 && (
  <div style={{ textAlign: "center", marginTop: "14px", userSelect: "none" }}>
    <button
      onClick={() => setCurrentUserPage((p) => Math.max(1, p - 1))}
      disabled={currentUserPage === 1}
      style={{
        padding: "6px 13px",
        marginRight: "8px",
        borderRadius: "10px",
        cursor: currentUserPage === 1 ? "not-allowed" : "pointer",
      }}
    >
      Prev
    </button>
    <span>
      Page {currentUserPage} of {userTotalPages}
    </span>
    <button
      onClick={() => setCurrentUserPage((p) => Math.min(userTotalPages, p + 1))}
      disabled={currentUserPage === userTotalPages}
      style={{
        padding: "6px 13px",
        marginLeft: "8px",
        borderRadius: "10px",
        cursor: currentUserPage === userTotalPages ? "not-allowed" : "pointer",
      }}
    >
      Next
    </button>
  </div>
)}

{/* Edit User Modal */}
{editUser && (
  <div className="modal-backdrop" onClick={closeEditUserModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <h3>Edit User</h3>
      <label>
        Name
        <br />
        <input
          type="text"
          value={editUserFields.name}
          onChange={(e) => handleEditUserChange("name", e.target.value)}
          style={{ width: "100%", padding: "6px 12px", borderRadius: "10px", border: "1.5px solid #cbd5e1", marginBottom: "10px" }}
        />
      </label>
      <label>
        Email
        <br />
        <input
          type="email"
          value={editUserFields.email}
          onChange={(e) => handleEditUserChange("email", e.target.value)}
          style={{ width: "100%", padding: "6px 12px", borderRadius: "10px", border: "1.5px solid #cbd5e1", marginBottom: "10px" }}
        />
      </label>
      <label>
        Role
        <br />
        <select
          value={editUserFields.role}
          onChange={(e) => handleEditUserChange("role", e.target.value)}
          style={{ width: "100%", padding: "6px 12px", borderRadius: "10px", border: "1.5px solid #cbd5e1" }}
        >
          <option value="admin">Admin</option>
          <option value="citizen">Citizen</option>
        </select>
      </label>

      <div style={{ marginTop: "20px", textAlign: "right" }}>
        <button
          onClick={handleSaveUser}
          style={{ backgroundColor: "#2563eb", color: "#fff", padding: "8px 20px", borderRadius: "12px", border: "none", cursor: "pointer", marginRight: "10px", fontWeight: "700" }}
        >
          Save
        </button>
        <button
          onClick={closeEditUserModal}
          style={{ backgroundColor: "#eaeaea", color: "#333", padding: "8px 20px", borderRadius: "12px", border: "none", cursor: "pointer", fontWeight: "600" }}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Map */}
      <h3>Crime Map</h3>
      <div className="map-container">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {crimeReports.map((report) => (
            <Marker
              key={report._id}
              position={[report.lat || 28.61, report.lng || 77.2]}
            >
              <Popup>
                <strong>{report.title}</strong>
                <br />
                {report.category} - {report.priority}
                <br />
                Status: {report.status}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Dashboard;
