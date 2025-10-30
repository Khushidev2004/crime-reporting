import { Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [role, setRole] = useState("citizen"); // "citizen" | "police" | "admin"
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Ordering and conditions improved.
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">Crime Portal</Link>
        </div>

        {/* Hamburger (Mobile) */}
        <div
          className={`menu-toggle${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Nav Links */}
        <ul className={`nav-links${menuOpen ? " active" : ""}`}>
          <li>
            <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>

          {!isLoggedIn ? (
            // Only show Login/Signup when NOT logged in
            <>
              <li>
                <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
              </li>
              <li>
                <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
              </li>
            </>
          ) : (
            <>
              {/* Logged in, show role-based options */}
              {role === "citizen" && (
                <li>
                  <Link to="/report" onClick={() => setMenuOpen(false)}>Report Crime</Link>
                </li>
              )}
              {(role === "police" || role === "admin") && (
                <li>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                </li>
              )}
              <li>
                <button
                  className="logout-btn"
                  onClick={() => {
                    setIsLoggedIn(false);
                    setRole("");
                    setMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
