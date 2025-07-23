import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import { MdSmartphone } from "react-icons/md";
import LoginModal from "../components/Login&Signup/LoginModal";
import SignupModal from "../components/Login&Signup/SignupModal";
import LogoutPopup from "../pages/LogoutPopup"; // Make sure this path is correct based on your structure
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

  // This function is now correctly passed down from App.jsx via props
  // and called when the "Logout" button is clicked.
  // The console.log was for debugging and can be removed in production.
  const handleLogoutClick = () => {
    console.log("Logout clicked in Navbar");
    if (onLogout) { // Ensure onLogout prop exists before calling
      onLogout();
    }
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
              {/* Call the local handleLogoutClick which then calls the prop */}
              <span className="navbar-link" onClick={handleLogoutClick}>
                Logout
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Modals (Login/Signup) */}
      <LoginModal
        show={showLogin}
        handleClose={handleCloseModals}
        handleSignUp={() => {
          setShowLogin(false);
          setShowSignup(true);
        }}
        // You might need to pass a handleLoginSuccess prop here if LoginModal handles actual login
        // and needs to update isAuthenticated state in App.jsx
      />
      <SignupModal
        show={showSignup}
        handleClose={handleCloseModals}
        handleLogin={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
        // You might need to pass a handleSignupSuccess prop here
      />
    </nav>
  );
};
export default Navbar;
