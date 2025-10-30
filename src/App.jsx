import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";


import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import ReportCrime from "./pages/ReportCrime.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import HomeSecurity from "./pages/HomeSecurity.jsx";
import NeighborhoodWatch from "./pages/NeighborhoodWatch.jsx";
import CrimePrevention from "./pages/CrimePrevention.jsx";
import SafetyAlerts from "./pages/SafetyAlerts.jsx";
import LegalResources from "./pages/LegalResources.jsx";

import Profile from "./pages/Profile.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import Sitemap from "./pages/Sitemap.jsx";
import Accessibility from "./pages/Accessibility.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<ReportCrime />} />
        <Route path="/tips/home-security" element={<HomeSecurity />} />
        <Route path="/tips/neighborhood-watch" element={<NeighborhoodWatch />} />
        <Route path="/tips/crime-prevention" element={<CrimePrevention />} />
        <Route path="/alerts" element={<SafetyAlerts />} />
        <Route path="/resources" element={<LegalResources />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/password-reset" element={<ResetPassword />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/accessibility" element={<Accessibility />} />
        <Route path="/dashboard" element={<ProtectedRoute allowedRoles={["admin", "police"]}><Dashboard /></ProtectedRoute>} />
      </Routes>
      <Footer /> {/* Footer yaha add karo */}
    </Router>
  );
}

export default App;
