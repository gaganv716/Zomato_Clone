import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CompleteProfile.css"; // Create this file for custom styles

function CompleteProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    city: "",
    preferences: [],
    cuisines: [],
    diningPreference: "",
  });

  const cities = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Chennai"];
  const cuisines = [
    "North Indian",
    "South Indian",
    "Chinese",
    "Italian",
    "Street Food",
    "Biryani",
    "Desserts",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox" && name === "preferences") {
      setFormData((prev) => ({
        ...prev,
        preferences: checked
          ? [...prev.preferences, value]
          : prev.preferences.filter((pref) => pref !== value),
      }));
    } else if (type === "checkbox" && name === "cuisines") {
      setFormData((prev) => ({
        ...prev,
        cuisines: checked
          ? [...prev.cuisines, value]
          : prev.cuisines.filter((cuisine) => cuisine !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/users/complete-profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        navigate("/homepage");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit profile");
    }
  };

  return (
    <div className="complete-profile-container">
      <h2>Just a few bites to go 🍴</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="">Select Your City</option>
          {cities.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>

        <fieldset>
          <legend>Food Preferences</legend>
          {["Veg", "Non-Veg", "Vegan", "Jain"].map((pref) => (
            <label key={pref}>
              <input
                type="checkbox"
                name="preferences"
                value={pref}
                checked={formData.preferences.includes(pref)}
                onChange={handleChange}
              />
              {pref}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Favourite Cuisines</legend>
          {cuisines.map((cuisine) => (
            <label key={cuisine}>
              <input
                type="checkbox"
                name="cuisines"
                value={cuisine}
                checked={formData.cuisines.includes(cuisine)}
                onChange={handleChange}
              />
              {cuisine}
            </label>
          ))}
        </fieldset>

        <fieldset>
          <legend>Dining Preference</legend>
          {["Dining Out", "Ordering In", "Both"].map((option) => (
            <label key={option}>
              <input
                type="radio"
                name="diningPreference"
                value={option}
                checked={formData.diningPreference === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </fieldset>

        <button type="submit">Finish & Explore Bitescape</button>
      </form>
    </div>
  );
}

export default CompleteProfile;
