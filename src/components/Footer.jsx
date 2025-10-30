import React from "react";
import { Link } from "react-router-dom";
import { FaFire, FaEnvelope, FaPhone, FaUserPlus, FaUserCog, FaKey, FaLock } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>
            <FaFire className="footer-icon" />
            <span className="highlight">Safeguard</span> Portal
          </h3>
          <p>Your trusted partner in community safety and crime prevention.</p>
          <div className="social-links">
            <a href="#"><FaEnvelope /></a>
            <a href="#"><FaPhone /></a>
            <a href="#"><FaUserPlus /></a>
            <a href="#"><FaUserCog /></a>
          </div>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/report">Report Crime</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/alerts">Safety Alerts</Link></li>
            <li><Link to="/resources">Legal Resources</Link></li>
            <li><Link to="/tips">Safety Tips</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Account</h4>
          <ul>
            <li><Link to="/login"><FaKey /> Login</Link></li>
            <li><Link to="/signup"><FaUserPlus /> Register</Link></li>
            <li><Link to="/profile"><FaUserCog /> My Profile</Link></li>
            <li><Link to="/password-reset"><FaLock /> Reset Password</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <div className="contact-item"><FaEnvelope /> <span>khushi.12@gamil.com</span></div>
            <div className="contact-item"><FaPhone /> <span>+91 7894561235</span></div>
            <div className="contact-item"><MdSecurity /> <span>Emergency: 112</span></div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Safeguard Portal | All Rights Reserved</p>
        <div className="footer-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
          <Link to="/sitemap">Sitemap</Link>
          <Link to="/accessibility">Accessibility</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
