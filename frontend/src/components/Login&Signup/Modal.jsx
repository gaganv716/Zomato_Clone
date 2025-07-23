import React from "react";
import "./Modal.css";

const Modal = ({ show, onClose, children }) => {
  if (!show) return null; // Don't render if the modal is not visible

  return (
    <div className="modal-overlay">
      <div className="login-modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {children} {/* Render dynamic content (Login/Signup forms) */}
      </div>
    </div>
  );
};

export default Modal;
