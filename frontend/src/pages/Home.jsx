import React, { useState } from "react";
import Navbar from "../components/Navbar";
import FoodCards from "../components/FoodCards";
import SearchBar from "../components/Searchbar";
import Collection from "../components/Collection";
import Localities from "../components/Localities";
import BitescapeApp from "../components/BitescapeApp";
import Explore from "../components/Explore";
import Footer from "../components/Footer";
import LoginModal from "../components/Login&Signup/LoginModal"; // Correct import
import SignupModal from "../components/Login&Signup/SignupModal"; // Correct import
import "./Home.css";

const Home = () => {
  const [showLogin, setShowLogin] = useState(false); // State for Login modal
  const [showSignup, setShowSignup] = useState(false); // State for Signup modal

  // 👉 Called when "Login" is clicked from Navbar or FoodCards
  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  // 👉 Called when "Signup" is clicked
  const handleSignupClick = () => {
    setShowSignup(true);
    setShowLogin(false);
  };

  // 👉 Close all modals
  const handleCloseModals = () => {
    setShowLogin(false);
    setShowSignup(false);
  };

  const handleLogout = () => {
    console.log("User logged out!");
    // Add logout logic here, e.g., clearing authentication tokens or redirecting to login
    window.location.href = "/"; // Redirect to the homepage after logout
  };
  
  return (
    <div>
      {/* Navbar with Login & Signup Handlers */}
      <Navbar
  isAuthenticated={false}
  isHomepage={false}
  onLogout={handleLogout} 
  onLoginClick={handleLoginClick}
  onSignupClick={handleSignupClick}
/>


      {/* Main Sections */}
      <SearchBar />
      <FoodCards onCardClick={handleLoginClick} /> {/* 👈 Pass login trigger to FoodCards */}
      <Collection />
      <Localities />
      <div id="bitescape-app-section">
        <BitescapeApp />
      </div>
      <Explore />
      <Footer />

      {/* Login Modal */}
      <LoginModal
        show={showLogin}
        handleClose={handleCloseModals}
        handleSignUp={handleSignupClick}
      />

      {/* Signup Modal */}
      <SignupModal
        show={showSignup}
        handleClose={handleCloseModals}
        handleLogin={handleLoginClick}
      />
    </div>
  );
};

export default Home;
