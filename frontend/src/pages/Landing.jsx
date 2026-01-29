import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/theme.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      {/* Main Content */}
      <div className="landing-content">
        <h1 className="headline">
          Plan your study-abroad journey with a guided AI counsellor.
        </h1>

        <p className="description">
          A step-by-step AI-driven platform that understands your profile,
          goals, and budget to guide you from confusion to confident decisions.
        </p>

        <div className="cta-group">
          <button className="btn-primary" onClick={() => navigate("/signup")}>
            Get Started
          </button>
          <button className="btn-secondary" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Landing;
