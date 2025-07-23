import React, { useState } from "react";
import "./Footer.css";

const Footer = () => {
  const countries = [
    { name: "India", flag: "https://flagcdn.com/w40/in.png" },
    { name: "United States", flag: "https://flagcdn.com/w40/us.png" },
    { name: "United Kingdom", flag: "https://flagcdn.com/w40/gb.png" },
    { name: "Canada", flag: "https://flagcdn.com/w40/ca.png" },
    { name: "Australia", flag: "https://flagcdn.com/w40/au.png" },
  ];

  const languages = ["English", "Hindi", "Spanish", "French", "German"];

  // ✅ State for selected country & language
  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  return (
    <footer className="footer">
      {/* Logo Section */}
      <div className="footer-logo">
        <h1><i>Bitescape</i></h1>
      </div>

      <div className="footer-sections">
        {/* About Bitescape */}
        <div className="footer-section">
          <h4 className="footer-title">About Bitescape</h4>
          <ul>
            <li><a href="#who-we-are">Who We Are</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#work-with-us">Work With Us</a></li>
            <li><a href="#investor-relations">Investor Relations</a></li>
            <li><a href="#report-fraud">Report Fraud</a></li>
            <li><a href="#press-kit">Press Kit</a></li>
            <li><a href="#contact-us">Contact Us</a></li>
          </ul>
        </div>

        {/* Bitescape Universe */}
        <div className="footer-section">
          <h4 className="footer-title">Bitescape Universe</h4>
          <ul>
            <li><a href="#bitescape">Bitescape</a></li>
            <li><a href="#events">Events</a></li>
            <li><a href="#community">Community</a></li>
            <li><a href="#sustainability">Sustainability</a></li>
            <li><a href="#hyperfood">Hyperfood</a></li>
            <li><a href="#livelife">LiveLife</a></li>
            <li><a href="#bitescape-land">Bitescape Land</a></li>
            <li><a href="#weather-partners">Weather Partners</a></li>
          </ul>
        </div>

        {/* For Restaurants */}
        <div className="footer-section">
          <h4 className="footer-title">For Restaurants</h4>
          <ul>
            <li><a href="#partner-with-us">Partner With Us</a></li>
            <li><a href="#apps-for-you">Apps For You</a></li>
          </ul>
        </div>

        {/* Learn More */}
        <div className="footer-section">
          <h4 className="footer-title">Learn More</h4>
          <ul>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#security">Security</a></li>
            <li><a href="#terms">Terms</a></li>
          </ul>
        </div>

        {/* ✅ Updated Country & Language Selectors */}
        <div className="footer-section">
          <h4 className="footer-title">Settings</h4>
          <div className="selectors">
            {/* Country Selector */}
            <div className="country-selector">
              <label htmlFor="countries">Country: </label>
              <select
                id="countries"
                name="countries"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                {countries.map((country, index) => (
                  <option key={index} value={country.name}>
                    {country.name} {/* ✅ Removed <span> inside <option> */}
                  </option>
                ))}
              </select>
              {/* ✅ Display Flag Outside Select */}
              <img
                src={countries.find(c => c.name === selectedCountry)?.flag}
                alt="Country Flag"
                className="flag-icon"
              />
            </div>

            {/* Language Selector */}
            <div className="language-selector">
              <label htmlFor="languages">Language: </label>
              <select
                id="languages"
                name="languages"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
              >
                {languages.map((language, index) => (
                  <option key={index} value={language}>
                    {language}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="footer-section">
          <h4 className="footer-title">Social Links</h4>
          <div className="social-icons">
            <a href="#linkedin" className="social-link">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="#instagram" className="social-link">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#twitter" className="social-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#youtube" className="social-link">
              <i className="fab fa-youtube"></i>
            </a>
            <a href="#facebook" className="social-link">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
          <div className="app-download-buttons">
            <a href="#google-play">
              <img src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png" alt="Google Play" />
            </a>
            <a href="#app-store">
              <img src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png" alt="App Store" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Disclaimer */}
      <div className="footer-disclaimer">
        <p>
          By continuing past this page, you agree to our Terms of Service,
          Cookie Policy, Privacy Policy, and Content Policies. All trademarks
          are properties of their respective owners. 2025 © Bitescape™ Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
