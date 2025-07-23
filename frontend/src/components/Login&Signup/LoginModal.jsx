import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Modal.css";

const LoginModal = ({ show, handleClose, handleSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const API_BASE_URL = import.meta.env.VITE_API_URL; // ✅ Uses environment variable

  const isValidEmail = email.trim().length > 0 && email.includes("@");
  const isValidPassword = password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail || !isValidPassword) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Login failed");

localStorage.setItem("token", data.token);
console.log("Logged in successfully:", email);
handleClose();

// ✅ Conditional navigation
if (data.isProfileComplete) {
  navigate("/homepage");
} else {
  navigate("/complete-profile");
}

  } catch (error) {
    setErrorMessage(error.message || "An error occurred during login");
    } finally {
      setIsSubmitting(false);
    }
  };
  
    const handleGoogleLogin = () => {
    window.location.href = `${API_BASE_URL}/api/auth/google`; // ✅ Uses environment variable
  };

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={handleClose}>✖</button>
        <h2>Login</h2>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`modal-btn ${isValidEmail && isValidPassword ? "" : "disabled-btn"}`}
            disabled={!isValidEmail || !isValidPassword || isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <hr style={{ margin: "20px 0" }} />

        <button className="google-btn" onClick={handleGoogleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
            style={{ width: "20px", marginRight: "10px", verticalAlign: "middle" }}
          />
          Continue with Google
        </button>

        <p className="signup-link">
          New to Bitescape?{" "}
          <span onClick={() => { handleClose(); handleSignUp(); }}>Create account</span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
