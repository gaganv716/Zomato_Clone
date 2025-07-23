// src/components/InfoPopup.jsx
import React from 'react';
import './InfoPopup.css'; // We'll create this CSS file next

const InfoPopup = ({ title, message, onClose }) => {
  return (
    <div className="info-popup-overlay">
      <div className="info-popup-content">
        <button className="info-popup-close-btn" onClick={onClose}>✖</button>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default InfoPopup;
