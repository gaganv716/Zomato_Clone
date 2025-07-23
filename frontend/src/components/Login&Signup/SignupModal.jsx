import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

// Added onSignupSuccess prop
const SignupModal = ({ show, handleClose, handleLogin, onSignupSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL; 

  const isValidEmail = email.trim().length > 0 && email.includes("@");
  const isValidPassword = password.length >= 6;
  const passwordsMatch = password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword || !passwordsMatch) {
      setErrorMessage("Please enter a valid email, a password of at least 6 characters, and ensure passwords match.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      console.log("Account created:", email);
      // Call the onSignupSuccess callback passed from App.jsx
      if (onSignupSuccess) {
        onSignupSuccess(data.token); // Pass the token up to App.jsx
      }

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      handleClose(); // Close the modal

      // The navigation logic is now handled by App.jsx's state update and route protection
      // or by the component that renders this modal, after onSignupSuccess is called.
      // If data.isProfileComplete is returned by backend on signup, this is fine.
      if (data.isProfileComplete) {
        navigate("/homepage");
      } else {
        navigate("/complete-profile");
      }

    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage(error.message || "An error occurred during signup.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>✖</button>
        <h2>Sign Up</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter a strong password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`modal-btn ${isValidEmail && isValidPassword && passwordsMatch ? "" : "disabled-btn"}`}
            disabled={!isValidEmail || !isValidPassword || !passwordsMatch || isSubmitting}
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <p className="login-link">
          Already have an account?{" "}
          <span onClick={() => { handleClose(); handleLogin(); }}>Login</span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
