import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="fade-in">🚨 Crime Reporting & City Safety Portal</h1>
          <p className="fade-in delay-1">
            Report crimes anonymously or openly. Track crime trends and monitor safety in your city in real-time.
          </p>
          <Link to="/report" className="hero-btn fade-in delay-2">Report a Crime</Link>
        </div>
      </section>

      {/* Cards Section */}
      <section className="cards-section">
        <div className="card fade-up">
          <h3>📄 Report Crime</h3>
          <p>Citizens can report incidents easily and attach evidence.</p>
          <Link to="/report" className="card-btn">Report Now</Link>
        </div>

        <div className="card fade-up delay-1">
          <h3>📊 Dashboard</h3>
          <p>Police/Admin can track and manage crime reports efficiently.</p>
          <Link to="/dashboard" className="card-btn">View Dashboard</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>🔒 Why Use Our Portal?</h2>
        <div className="features-grid">
          <div className="feature fade-up">
            <h3>🕵️ Anonymous Reports</h3>
            <p>Report crimes without revealing your identity.</p>
          </div>
          <div className="feature fade-up delay-1">
            <h3>⚡ Real-Time Tracking</h3>
            <p>Authorities can act quickly with instant notifications.</p>
          </div>
          <div className="feature fade-up delay-2">
            <h3>📂 Secure Database</h3>
            <p>All reports and evidence are stored safely.</p>
          </div>
          <div className="feature fade-up delay-3">
            <h3>🌍 24/7 Accessibility</h3>
            <p>Access the portal anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <h2>💬 What Citizens Say</h2>
        <div className="testimonials">
          <div className="testimonial slide-in-left">
            <p>"This platform makes reporting so easy and safe!"</p>
            <span>- Anjali, Mumbai</span>
          </div>
          <div className="testimonial slide-in-right">
            <p>"The dashboard helped us track cases efficiently."</p>
            <span>- Inspector Sharma</span>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <h3>Crime Reporting Portal</h3>
            <p>Making cities safer, one report at a time.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/report">Report</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Email: <a href="mailto:support@crimeportal.com">support@crimeportal.com</a></p>
            <p>Helpline: 1800-123-456</p>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
            </div>
          </div>
        </div>
        <p className="footer-bottom">© 2025 Crime Reporting Portal | Made with ❤️ for safer cities</p>
      </footer>
    </div>
  );
}

export default Home;
