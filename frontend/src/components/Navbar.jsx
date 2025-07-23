import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { MdSmartphone } from "react-icons/md";
import LoginModal from "../components/Login&Signup/LoginModal";
import SignupModal from "../components/Login&Signup/SignupModal";
import LogoutPopup from "../pages/LogoutPopup";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, isHomepage, onLogout }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false); // Ensure Signup modal is closed
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false); // Ensure Login modal is closed
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <nav className={`navbar ${isHomepage ? "navbar-homepage" : ""}`}>
      <div className="navbar-left">
        <ul>
          <ScrollLink
            to="bitescape-app-section"
            smooth={true}
            duration={500}
            className="navbar-link"
          >
            <MdSmartphone className="smartphone-icon" /> Get the App
          </ScrollLink>
        </ul>
      </div>
      <div className="navbar-right">
        <ul className="menu">
          <li>
            <Link to="/add-restaurant" className="navbar-link">
              Add restaurant
            </Link>
          </li>
          {!isAuthenticated ? (
            <>
              <li>
                <span className="navbar-link" onClick={handleLoginClick}>
                  Log in
                </span>
              </li>
              <li>
                <span className="navbar-link" onClick={handleSignupClick}>
                  Sign up
                </span>
              </li>
            </>
          ) : (
            <li>
              {/* 🔥 Fix: Use the prop you passed */}
              <span className="navbar-link" onClick={() => {
  console.log("Logout clicked"); // 👈 Add this
  onLogout();
}}>
  Logout
</span>

            </li>
          )}
        </ul>
      </div>

      {/* Modals */}
      <LoginModal
        show={showLogin}
        handleClose={handleCloseModals}
        handleSignUp={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
      />
      <SignupModal
        show={showSignup}
        handleClose={handleCloseModals}
        handleLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />
    </nav>
  );
};
export default Navbar;