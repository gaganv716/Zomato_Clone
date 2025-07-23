import React, { useState } from "react";
import "./BitescapeApp.css";

const BitescapeApp = () => {
  const [placeholder, setPlaceholder] = useState(""); // No placeholder by default

  const handleOptionChange = (event) => {
    if (event.target.value === "email") {
      setPlaceholder("Enter email");
    } else {
      setPlaceholder("Enter phone number");
    }
  };

  return (
    <div className="app-section">
      {/* Image Section */}
      <div className="app-display">
        <img
          src="https://b.zmtcdn.com/data/o2_assets/ce5bc038a8a2d4f8f24465c8826182af1726501431.png"
          alt="Bitescape App Promo"
          className="app-image"
        />
      </div>

      {/* Text and Download Section */}
      <div className="app-promo">
        <h2 className="promo-title">Get the Bitescape App</h2>
        <p className="promo-subtitle">
          Discover amazing restaurants and food options right from your phone.
        </p>

        {/* Input Form */}
        <div className="promo-form">
          {/* Radio Buttons */}
          <div className="promo-radio">
            <label>
              <input
                type="radio"
                name="send-option"
                value="email"
                onChange={handleOptionChange}
              />{" "}
              Email
            </label>
            <label>
              <input
                type="radio"
                name="send-option"
                value="phone"
                onChange={handleOptionChange}
              />{" "}
              Phone
            </label>
          </div>

          {/* Input Field and Button */}
          <div className="input-button-group">
            <input
              type="text"
              placeholder={placeholder}
              className="promo-input"
            />
            <button className="promo-button">Share App Link</button>
          </div>
        </div>

        {/* Download Links */}
        <div className="download-buttons">
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png"
              alt="Google Play"
              className="download-btn"
            />
          </a>
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png"
              alt="App Store"
              className="download-btn"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BitescapeApp;