import React from "react";
import "./Localities.css";

const localities = [
  { name: "Indiranagar", places: 634 },
  { name: "Marathahalli", places: 1094 },
  { name: "Whitefield", places: 1135 },
  { name: "Koramangala 5th Block", places: 335 },
  { name: "HSR", places: 1062 },
  { name: "Jayanagar", places: 689 },
  { name: "JP Nagar", places: 813 },
  { name: "Sarjapur Road", places: 865 },
];

const Localities = () => {
  return (
    <div className="localities-container">
      <h2 className="localities-title">Popular localities in and around Bengaluru</h2>
      <ul className="localities-list">
        {localities.map((locality, index) => (
          <li key={index} className="localities-item">
            <span className="locality-name">{locality.name}</span>
            <span className="locality-places">{locality.places} Places</span>
          </li>
        ))}
        {/* Adding "See More" as part of the grid */}
        <li className="see-more">
          <a href="#">See more</a>
        </li>
      </ul>
    </div>
  );
};

export default Localities;
