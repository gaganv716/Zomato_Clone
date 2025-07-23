import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../Login&Signup/LoginModal";
import SignupModal from "../Login&Signup/SignupModal";
import "./AddRestaurantNav.css";

const AddRestaurantNav = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  return (
    <div className="add-restaurant-container">
      <nav className="add-restaurant-navbar">
        <div className="nav-left">
          <span className="brands-name">Bitescape</span>
        </div>

        <div className="nav-right">
          <span className="nav-link" onClick={handleLoginClick}>Login</span>
          <span className="nav-link" onClick={handleSignupClick}>Signup</span>
        </div>
      </nav>

      <div className="add-restaurant-content">
        <h1>Partner with Bitescape and grow your business</h1>
        <p>0% commission for 1st month! Valid for new restaurant partners in select cities</p>
        <Link to="/" className="add-restaurant-btn">
          Register Your Restaurant
        </Link>
      </div>

      <LoginModal
        show={showLogin}
        handleClose={handleCloseModals}
        handleSignUp={handleSignupClick}
      />

      <SignupModal
        show={showSignup}
        handleClose={handleCloseModals}
        handleLogin={handleLoginClick}
      />
    </div>
  );
};

export default AddRestaurantNav;
