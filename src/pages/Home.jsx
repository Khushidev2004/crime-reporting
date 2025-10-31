import { Link } from "react-router-dom";
import React, { useState } from "react";
import "./Home.css";

// Import all required icons
import {
  FaArrowRight,
  FaShieldAlt,
  FaBullseye,
  FaChartLine,
  FaUserShield,
  FaBell,
  FaEnvelope,
  FaPhone,
  FaSearch,
  FaMapMarkerAlt,
  FaChartBar,
  FaUserPlus,
  FaKey,
  FaLock,
  FaUserCog,
  FaFire
} from "react-icons/fa";

import {
  GiPoliceCar,
  GiCrimeSceneTape,
  GiSafetyPin,
  GiJusticeStar,
  GiMagnifyingGlass
} from "react-icons/gi";

import {
  MdSecurity,
  MdDashboard,
  MdReport,
  MdVerifiedUser,
  MdSecurityUpdate,
  MdLocalPolice,
  MdWarning,
  MdHelp,
  MdInfo
} from "react-icons/md";

function Home() {
  const [activeTab, setActiveTab] = useState('citizen');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="home-container">
      {/* Hero Section without Carousel */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1>
              <FaFire className="hero-icon" />
              <span className="highlight">Safeguard</span> <span className="highlightNearText">Your Community</span>
            </h1>
            <p className="subtitle">A comprehensive platform for crime reporting, safety monitoring, and community engagement</p>
            <div className="search-container">
              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder="Search for crime reports, safety tips, or legal resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-button">
                  <GiMagnifyingGlass />
                </button>
              </form>
            </div>
            <div className="cta-buttons">
              <Link to="/report" className="primary-btn">
                <MdReport /> Report a Crime
              </Link>
              <Link to="/dashboard" className="secondary-btn">
                <MdDashboard /> View Dashboard
              </Link>
            </div>
          </div>
          {/* hero-image div deleted */}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>
          <FaChartBar className="section-icon" />
          <span className="highlight">Crime Statistics</span>
        </h2>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">
              <GiPoliceCar />
            </div>
            <div className="stat-content">
              <h3>12,456</h3>
              <p>Cases Resolved</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaShieldAlt />
            </div>
            <div className="stat-content">
              <h3>87%</h3>
              <p>Crime Reduction</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaBullseye />
            </div>
            <div className="stat-content">
              <h3>92%</h3>
              <p>Case Accuracy</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">
              <FaChartLine />
            </div>
            <div className="stat-content">
              <h3>4,231</h3>
              <p>Active Cases</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>
          <FaArrowRight className="section-icon" />
          <span className="highlight">Key Features</span>
        </h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <GiCrimeSceneTape />
            </div>
            <h3>Crime Reporting</h3>
            <p>Easily report crimes with detailed forms and evidence upload options.</p>
            <Link to="/report" className="feature-link">
              Learn More <FaArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <MdDashboard />
            </div>
            <h3>Admin Dashboard</h3>
            <p>Comprehensive dashboard for tracking, managing, and analyzing crime data.</p>
            <Link to="/dashboard" className="feature-link">
              Learn More <FaArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <GiSafetyPin />
            </div>
            <h3>Safety Alerts</h3>
            <p>Receive real-time safety alerts and notifications about crimes in your area.</p>
            <Link to="/alerts" className="feature-link">
              Learn More <FaArrowRight />
            </Link>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <GiJusticeStar />
            </div>
            <h3>Legal Resources</h3>
            <p>Access to legal advice, rights information, and support services.</p>
            <Link to="/resources" className="feature-link">
              Learn More <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>
          <FaBell className="section-icon" />
          <span className="highlight">How It Works</span>
        </h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-icon">
              <MdReport />
            </div>
            <h3>Report an Incident</h3>
            <p>Submit a detailed report of the crime with photos, videos, or documents.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-icon">
              <MdDashboard />
            </div>
            <h3>Track Progress</h3>
            <p>Monitor the status of your report through our secure dashboard.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <div className="step-icon">
              <FaBell />
            </div>
            <h3>Get Notified</h3>
            <p>Receive updates and alerts about your case and related incidents.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <div className="step-icon">
              <MdVerifiedUser />
            </div>
            <h3>Verify & Confirm</h3>
            <p>Confirm the resolution of your case and provide feedback.</p>
          </div>
        </div>
      </section>

      {/* Safety Tips Section */}
      <section className="safety-tips">
        <h2>
          <FaMapMarkerAlt className="section-icon" />
          <span className="highlight">Safety Tips</span>
        </h2>
        <div className="tips-container">
          <div className="tip-card">
            <div className="tip-icon">
              <MdSecurity />
            </div>
            <h3>Home Security</h3>
            <p>Always lock your doors and windows, even when you're home. Install security cameras and motion-sensor lights.</p>
            <Link to="/tips/home-security" className="tip-link">
              Read More <FaArrowRight />
            </Link>
          </div>
          <div className="tip-card">
            <div className="tip-icon">
              <FaMapMarkerAlt />
            </div>
            <h3>Neighborhood Watch</h3>
            <p>Get to know your neighbors and participate in local safety initiatives. Report suspicious activity immediately.</p>
            <Link to="/tips/neighborhood-watch" className="tip-link">
              Read More <FaArrowRight />
            </Link>
          </div>
          <div className="tip-card">
            <div className="tip-icon">
              <FaChartBar />
            </div>
            <h3>Crime Prevention</h3>
            <p>Learn about common crimes in your area and how to protect yourself. Stay informed about local crime trends.</p>
            <Link to="/tips/crime-prevention" className="tip-link">
              Read More <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>
          <FaEnvelope className="section-icon" />
          <span className="highlight">What Our Users Say</span>
        </h2>
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"This platform made it so easy to report a theft in my neighborhood. The police responded within hours!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">A</div>
                <div className="author-info">
                  <h4>Rahul K.</h4>
                  <p>Resident, Delhi</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"As a police officer, this dashboard has revolutionized how we track and manage cases. It's a game-changer!"</p>
              <div className="testimonial-author">
                <div className="author-avatar">I</div>
                <div className="author-info">
                  <h4>Inspector Mehta</h4>
                  <p>Mumbai Police</p>
                </div>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="testimonial-content">
              <p>"The safety alerts have made me feel much more secure in my area. I can plan my day knowing what's happening around me."</p>
              <div className="testimonial-author">
                <div className="author-avatar">S</div>
                <div className="author-info">
                  <h4>Priya S.</h4>
                  <p>Student, Bangalore</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>
            <FaBell className="section-icon" />
            <span className="highlight">Join Us in Making Cities Safer</span>
          </h2>
          <p>Be part of the movement to create safer communities through technology and community engagement.</p>
          <div className="cta-buttons">
            <Link to="/register" className="primary-btn">
              <FaUserPlus /> Get Started
            </Link>
            <Link to="/about" className="secondary-btn">
              <FaArrowRight /> Learn More
            </Link>
          </div>
        </div>
      </section>
 </div>
  );
}

export default Home;
