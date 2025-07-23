import React from "react";
import AddRestaurantNav from "./AddRestaurantNav";
import "./AddRestaurant.css"; // Ensure you have this CSS file

const AddRestaurant = () => {
  return (
    <div className="add-restaurant-container">
      <AddRestaurantNav /> {/* Navbar for AddRestaurant Page */}
      <div className="add-restaurant-content">
        <h1>Add Your Restaurant</h1>
        <p>Partner with Bitescape to reach more customers.</p>
      </div>
    </div>
  );
};

export default AddRestaurant;
