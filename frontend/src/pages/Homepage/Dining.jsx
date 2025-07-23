import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Collection from "../../components/Collection";
import Restaurantlist from "../Restaurant/Restaurantlist";
import Explore from "../../components/Explore";
import Footer from "../../components/Footer";
import LogoutPopup from "../LogoutPopup"; // ✅ Import logout popup
import "../../pages/Restaurant/Restaurantlist.css";
import "./Dining.css";

// ✅ Import the new diningRestaurants array
import diningRestaurants  from "../../data/diningRestaurants"; // Adjust path if needed

const categories = [
  { name: "Dining Out", icon: "🍽️", path: "/dining" },
  { name: "Delivery", icon: "🛵", path: "/homepage" },
  { name: "Nightlife", icon: "🍺", path: "/nightlife" },
];

function Dining({ isAuthenticated, onLogout }) {
  const [selectedCategory, setSelectedCategory] = useState("Dining Out");
  const underlineRef = useRef(null);
  const categoryRefs = useRef([]);
  const navigate = useNavigate();

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  const updateUnderline = (index) => {
    const category = categoryRefs.current[index];
    if (underlineRef.current && category) {
      underlineRef.current.style.width = `${category.offsetWidth}px`;
      underlineRef.current.style.transform = `translateX(${category.offsetLeft}px)`;
    }
  };

  useEffect(() => {
    const index = categories.findIndex((c) => c.name === selectedCategory);
    updateUnderline(index);
  }, [selectedCategory]);

  const handleCategoryClick = (category, index) => {
    setSelectedCategory(category.name);
    updateUnderline(index);
    navigate(category.path);
  };

  const handleLogout = () => {
    setShowLogoutPopup(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    onLogout();
  };

  const handleCancelLogout = () => {
    setShowLogoutPopup(false);
  };

  return (
    <div className="dining-page">
      <Navbar
        isAuthenticated={isAuthenticated}
        isHomepage={true}
        onLogout={handleLogout}
      />

      <div className="categories-container">
        <div className="categories-wrapper">
          {categories.map((category, index) => (
            <div
              key={category.name}
              ref={(el) => (categoryRefs.current[index] = el)}
              className={`category-item ${
                selectedCategory === category.name ? "active" : ""
              }`}
              onClick={() => handleCategoryClick(category, index)}
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
          <div className="underline" ref={underlineRef}></div>
        </div>
      </div>

      <section className="collection-section">
        <Collection />
      </section>

      <section className="restaurant-list-section">
        <h2 className="section-title">Restaurants for Dining Out</h2>
        <Restaurantlist restaurants={diningRestaurants} /> {/* ✅ Updated here */}
      </section>

      <section className="explore-section">
        <Explore />
      </section>

      <Footer />

      {showLogoutPopup && (
        <LogoutPopup
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </div>
  );
}

export default Dining;
