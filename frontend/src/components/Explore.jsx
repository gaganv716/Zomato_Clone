import React, { useState } from "react";
import "./Explore.css";

const Explore = () => {
  const data = {
    "Popular cuisines near me": [
      "Bakery near me",
      "Beverages near me",
      "Biryani near me",
      "Burger near me",
      "Chinese near me",
      "Desserts near me",
      "Ice Cream near me",
      "Juices near me",
      "Kebab near me",
      "Mughlai near me",
      "North Indian near me",
      "Pizza near me",
      "Rolls near me",
      "Sandwich near me",
      "Seafood near me",
      "Shake near me",
      "Sichuan near me",
      "South Indian near me",
      "Street near me",
      "Tea near me",
    ],
    "Popular restaurant types near me": [
      "Bakery near me",
      "Bars near me",
      "Beverage Shops near me",
      "Bhojanalya near me",
      "Cafes near me",
      "Casual Dining near me",
      "Clubs near me",
      "Confectioneries near me",
      "Dessert Parlors near me",
      "Dhabas near me",
      "Fine Dining near me",
      "Food Courts near me",
      "Food Trucks near me",
      "Irani Cafes near me",
      "Kiosks near me",
      "Lounges near me",
      "Microbreweries near me",
      "Paan Shops near me",
      "Pubs near me",
      "Quick Bites near me",
      "Sweet Shops near me",
    ],
    "Top restaurant chains": [
      "Biryani Blues",
      "Burger King",
      "Burger Singh",
      "Domino's",
      "KFC",
      "Krispy Kreme",
      "McDonald's",
      "Pizza Hut",
      "WOW! Momo",
    ],
    "Cities we deliver to": [
      "Delhi NCR",
      "Hyderabad",
      "Ahmedabad",
      "Nashik",
      "Amritsar",
      "Ranchi",
      "Vadodara",
      "Puducherry",
      "Srinagar",
      "Haridwar",
      "Kozhikode",
      "Jodhpur",
      "Jalandhar",
      "Kolkata",
      "Chennai",
      "Chandigarh",
      "Ooty",
      "Kanpur",
      "Visakhapatnam",
      "Nagpur",
      "Surat",
      "Khajuraho",
      "Leh",
      "Alappuzha",
      "Thrissur",
      "Ajmer",
      "Manali",
      "Mumbai",
      "Lucknow",
      "Goa",
      "Shimla",
      "Allahabad",
      "Bhubaneswar",
      "Agra",
      "Varanasi",
      "Neemrana",
      "Pushkar",
      "Kota",
      "Jammu",
      "Bengaluru",
      "Kochi",
      "Indore",
      "Ludhiana",
      "Aurangabad",
      "Coimbatore",
      "Dehradun",
      "Patna",
      "Cuttack",
      "Rajkot",
      "Manipal",
      "Mussoorie",
      "Pune",
      "Jaipur",
      "Gangtok",
      "Guwahati",
      "Bhopal",
      "Mangalore",
      "Mysore",
      "Udaipur",
      "Trivandrum",
      "Madurai",
      "Vijayawada",
      "Rishikesh",
    ],
  };

  const [expandedCategory, setExpandedCategory] = useState(null);

  const toggleDropdown = (category) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  return (
    <div className="explore-section">
      <h2 className="explore-title">Explore options near me</h2>
      <div className="explore-dropdowns">
        {Object.keys(data).map((category, index) => (
          <div key={index} className="dropdown">
            <div
              className="dropdown-header"
              onClick={() => toggleDropdown(category)}
            >
              <span className="dropdown-title">{category}</span>
              <span className="dropdown-arrow">
                {expandedCategory === category ? "▲" : "▼"}
              </span>
            </div>
            {expandedCategory === category && (
              <div className="dropdown-list">
                {data[category].map((item, itemIndex) => (
                  <div key={itemIndex} className="dropdown-item">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
