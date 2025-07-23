// LogoutPopup.jsx
import React from 'react';
import './LogoutPopup.css'; // optional styling

const LogoutPopup = ({ onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>Are you sure you want to logout?</p>
        <div className="popup-buttons">
          <button className="yes-btn" onClick={onConfirm}>Yes</button>
          <button className="no-btn" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
