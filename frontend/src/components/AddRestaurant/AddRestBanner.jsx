import React from "react";
import "./AddRestBanner.css";
import { FaCheckCircle } from "react-icons/fa"; // Import green tick icon from React Icons

const AddRestBanner = () => {
  return (
    <div className="banner-container">
      {/* Left-Aligned Text */}
      <div className="banner-text">
        <h1>Get Started - It only takes 10 minutes</h1>
        <p>Please keep these documents and details ready for a smooth sign-up:</p>
        <div className="document-lists">
          {/* Left-Aligned List */}
          <ul className="document-list">
            <li>
              <FaCheckCircle className="green-tick-icon" /> PAN card
            </li>
            <li>
              <FaCheckCircle className="green-tick-icon" /> FSSAI license <a href="https://foscos.fssai.gov.in/apply-for-lic-and-reg">Apply here</a>
            </li>
            <li>
              <FaCheckCircle className="green-tick-icon" /> Bank account details
            </li>
          </ul>

          {/* Right-Aligned List */}
          <ul className="document-list right-aligned">
            <li>
              <FaCheckCircle className="green-tick-icon" /> GST number, if applicable
            </li>
            <li>
              <FaCheckCircle className="green-tick-icon" /> Food & Menu Image View.
            </li>
          </ul>
        </div>
      </div>

      {/* Right-Aligned YouTube Video */}
      <div className="banner-video">
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Vss6HuvvyZo?si=aIi8z07XH09lzZN3"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default AddRestBanner;
