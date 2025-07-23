import { useState } from "react";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import "./Searchbar.css";  // Ensure CSS is imported

const SearchBar = () => {
  const [location, setLocation] = useState("Bengaluru");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="hero-section">
      <h1 className="logo"><i>BITESCAPE</i></h1>
      <h2 className="tagline">Discover the best food & drinks in {location}</h2>

      <div className="search-container">
        {/* Location Dropdown */}
        <div className="location-dropdown">
          <FaMapMarkerAlt className="location-icon" />
          <select onChange={(e) => setLocation(e.target.value)} value={location}>
            <option value="Bengaluru">Bengaluru</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi">Delhi</option>
            <option value="Detect">Detect my location</option>
          </select>
        </div>

        {/* Search Box */}
        <div className="search-box">
          <input
            type="text"
            placeholder="Search for restaurant, cuisine or a dish"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
