import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "../../styles/navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          AI Counsellor
        </Link>

        <div className="navbar-menu">
          <Link
            to="/"
            className={`navbar-link ${isActive("/") ? "active" : ""}`}
          >
            Home
          </Link>

          {user ? (
            <>
              {user.stage === "onboarding" && (
                <Link
                  to="/onboarding"
                  className={`navbar-link ${isActive("/onboarding") ? "active" : ""}`}
                >
                  Onboarding
                </Link>
              )}
              {user.stage === "dashboard" && (
                <>
                  <Link
                    to="/dashboard"
                    className={`navbar-link ${isActive("/dashboard") ? "active" : ""}`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/counsellor"
                    className={`navbar-link ${isActive("/counsellor") ? "active" : ""}`}
                  >
                    AI Counsellor
                  </Link>
                  <Link
                    to="/shortlist"
                    className={`navbar-link ${isActive("/shortlist") ? "active" : ""}`}
                  >
                    Shortlisting
                  </Link>
                </>
              )}
              <button className="navbar-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className={`navbar-link ${isActive("/login") ? "active" : ""}`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className={`navbar-link navbar-link-primary ${isActive("/signup") ? "active" : ""}`}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
