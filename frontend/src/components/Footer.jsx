import React, { useState } from "react";
import InfoPopup from "./InfoPopup"; // Import the new InfoPopup component
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

  // State for selected country & language
  const [selectedCountry, setSelectedCountry] = useState(countries[0].name);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  // State for managing the info popup
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  const [infoPopupContent, setInfoPopupContent] = useState({ title: "", message: "" });

  // Data for popup content based on link IDs
  const popupData = {
    "who-we-are": {
      title: "Who We Are",
      message: "Bitescape is your ultimate guide to discovering and ordering food from the best restaurants around you. We're passionate about connecting food lovers with incredible culinary experiences and supporting local businesses."
    },
    "blog": {
      title: "Our Blog",
      message: "Stay updated with the latest food trends, restaurant reviews, culinary tips, and exciting news from the Bitescape community on our official blog."
    },
    "work-with-us": {
      title: "Work With Us",
      message: "Join the Bitescape team! We're always looking for talented individuals passionate about food and technology. Check our careers page for open positions."
    },
    "investor-relations": {
      title: "Investor Relations",
      message: "For investors and stakeholders, find all relevant financial information, reports, and updates on Bitescape's performance and future outlook."
    },
    "report-fraud": {
      title: "Report Fraud",
      message: "Your safety is our priority. If you suspect any fraudulent activity or have encountered an issue, please report it immediately through our secure channel."
    },
    "press-kit": {
      title: "Press Kit",
      message: "Access our official press releases, brand assets, and media contacts for all your journalistic and media inquiries."
    },
    "contact-us": {
      title: "Contact Us",
      message: "Have questions or feedback? Reach out to our customer support team. We're here to help you with any inquiries regarding your orders or our services."
    },
    "bitescape": {
      title: "Bitescape Platform",
      message: "Explore the full range of features and services offered by the Bitescape platform, designed to enhance your dining and ordering experience."
    },
    "events": {
      title: "Bitescape Events",
      message: "Discover and participate in exciting food festivals, culinary workshops, and community gatherings organized by Bitescape."
    },
    "community": {
      title: "Bitescape Community",
      message: "Connect with fellow food enthusiasts, share your experiences, and discover new favorites within the vibrant Bitescape community."
    },
    "sustainability": {
      title: "Sustainability Initiatives",
      message: "Learn about Bitescape's commitment to sustainability, including our efforts to reduce food waste and support eco-friendly practices."
    },
    "hyperfood": {
      title: "Hyperfood",
      message: "Hyperfood is our innovative approach to exploring future food technologies and sustainable culinary solutions."
    },
    "livelife": {
      title: "LiveLife",
      message: "LiveLife is a Bitescape initiative promoting healthy eating habits and active lifestyles through balanced nutrition and delicious food choices."
    },
    "bitescape-land": {
      title: "Bitescape Land",
      message: "Bitescape Land is our virtual space for exclusive content, games, and interactive experiences for our most loyal users."
    },
    "weather-partners": {
      title: "Weather Partners",
      message: "Our weather partners help us predict optimal delivery times and ensure your food arrives fresh, regardless of the conditions."
    },
    "partner-with-us": {
      title: "Partner With Us",
      message: "Are you a restaurant owner? Partner with Bitescape to expand your reach, manage orders efficiently, and grow your business."
    },
    "apps-for-you": {
      title: "Apps For You",
      message: "Download the Bitescape app for a seamless ordering experience on the go. Available on both iOS and Android."
    },
    "privacy": {
      title: "Privacy Policy",
      message: "Your privacy is paramount. Our Privacy Policy details how we collect, use, and protect your personal information."
    },
    "security": {
      title: "Security Measures",
      message: "Bitescape employs robust security measures to safeguard your data and ensure secure transactions. Your trust is our top priority."
    },
    "terms": {
      title: "Terms of Service",
      message: "By using Bitescape, you agree to abide by our Terms of Service. Please review them to understand your rights and responsibilities."
    },
    // Social links and app download buttons
    "linkedin": { title: "LinkedIn", message: "Connect with Bitescape on LinkedIn for professional updates and insights." },
    "instagram": { title: "Instagram", message: "Follow Bitescape on Instagram for delicious food photos, behind-the-scenes, and daily inspirations." },
    "twitter": { title: "Twitter", message: "Get the latest news, announcements, and engage with Bitescape on Twitter." },
    "youtube": { title: "YouTube", message: "Subscribe to Bitescape on YouTube for cooking tutorials, restaurant features, and more!" },
    "facebook": { title: "Facebook", message: "Like Bitescape on Facebook to join our community and stay updated on promotions and events." },
    "google-play": { title: "Google Play", message: "Download the Bitescape app from Google Play Store." },
    "app-store": { title: "App Store", message: "Download the Bitescape app from Apple App Store." },
  };

  // Function to handle link clicks and show popup
  const handleLinkClick = (id) => {
    const content = popupData[id];
    if (content) {
      setInfoPopupContent(content);
      setShowInfoPopup(true);
    } else {
      console.warn(`No popup content defined for ID: ${id}`);
      // Fallback: Could show a generic message or do nothing
    }
  };

  const closeInfoPopup = () => {
    setShowInfoPopup(false);
    setInfoPopupContent({ title: "", message: "" }); // Clear content
  };

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
            {/* Changed <a> to <span> and added onClick handler */}
            <li><span className="footer-link" onClick={() => handleLinkClick("who-we-are")}>Who We Are</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("blog")}>Blog</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("work-with-us")}>Work With Us</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("investor-relations")}>Investor Relations</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("report-fraud")}>Report Fraud</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("press-kit")}>Press Kit</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("contact-us")}>Contact Us</span></li>
          </ul>
        </div>

        {/* Bitescape Universe */}
        <div className="footer-section">
          <h4 className="footer-title">Bitescape Universe</h4>
          <ul>
            <li><span className="footer-link" onClick={() => handleLinkClick("bitescape")}>Bitescape</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("events")}>Events</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("community")}>Community</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("sustainability")}>Sustainability</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("hyperfood")}>Hyperfood</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("livelife")}>LiveLife</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("bitescape-land")}>Bitescape Land</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("weather-partners")}>Weather Partners</span></li>
          </ul>
        </div>

        {/* For Restaurants */}
        <div className="footer-section">
          <h4 className="footer-title">For Restaurants</h4>
          <ul>
            <li><span className="footer-link" onClick={() => handleLinkClick("partner-with-us")}>Partner With Us</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("apps-for-you")}>Apps For You</span></li>
          </ul>
        </div>

        {/* Learn More */}
        <div className="footer-section">
          <h4 className="footer-title">Learn More</h4>
          <ul>
            <li><span className="footer-link" onClick={() => handleLinkClick("privacy")}>Privacy</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("security")}>Security</span></li>
            <li><span className="footer-link" onClick={() => handleLinkClick("terms")}>Terms</span></li>
          </ul>
        </div>

        {/* Updated Country & Language Selectors (no change needed here) */}
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
                    {country.name}
                  </option>
                ))}
              </select>
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
            {/* Changed <a> to <span> and added onClick handler */}
            <span className="social-link" onClick={() => handleLinkClick("linkedin")}>
              <i className="fab fa-linkedin"></i>
            </span>
            <span className="social-link" onClick={() => handleLinkClick("instagram")}>
              <i className="fab fa-instagram"></i>
            </span>
            <span className="social-link" onClick={() => handleLinkClick("twitter")}>
              <i className="fab fa-twitter"></i>
            </span>
            <span className="social-link" onClick={() => handleLinkClick("youtube")}>
              <i className="fab fa-youtube"></i>
            </span>
            <span className="social-link" onClick={() => handleLinkClick("facebook")}>
              <i className="fab fa-facebook"></i>
            </span>
          </div>
          <div className="app-download-buttons">
            {/* Changed <a> to <span> and added onClick handler */}
            <span className="app-download-link" onClick={() => handleLinkClick("google-play")}>
              <img src="https://b.zmtcdn.com/data/webuikit/23e930757c3df49840c482a8638bf5c31556001144.png" alt="Google Play" />
            </span>
            <span className="app-download-link" onClick={() => handleLinkClick("app-store")}>
              <img src="https://b.zmtcdn.com/data/webuikit/9f0c85a5e33adb783fa0aef667075f9e1556003622.png" alt="App Store" />
            </span>
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

      {/* Conditionally render the InfoPopup */}
      {showInfoPopup && (
        <InfoPopup
          title={infoPopupContent.title}
          message={infoPopupContent.message}
          onClose={closeInfoPopup}
        />
      )}
    </footer>
  );
};

export default Footer;
