import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./TrackOrder.css";

const statusStages = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

const TrackOrder = () => {
  const location = useLocation();
  // Ensure orderId and restaurantId are correctly passed from OrderSuccess.jsx
  // OrderSuccess.jsx should receive orderId and restaurantId from Order.jsx's navigate state.
  const { orderId, restaurantId } = location.state || {}; // Expecting restaurantId now, not full restaurant object

  const [order, setOrder] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [restaurantName, setRestaurantName] = useState("Unknown Restaurant"); // State to hold restaurant name

  // Retrieve API_BASE_URL from environment variables
  // This should be 'https://bitescape.onrender.com' when deployed.
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Fallback for local testing

  useEffect(() => {
    if (orderId) {
      // IMPORTANT: Use API_BASE_URL for the fetch call
      fetch(`${API_BASE_URL}/api/orders/${orderId}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(data => {
          if (data && Array.isArray(data.items)) {
            setOrder(data);
            // Optionally, you can set the initial stage based on data.status if your backend provides it
            // e.g., if (data.status) { setCurrentStage(statusStages.indexOf(data.status)); }

            // Fetch restaurant data if restaurantId is available and not already passed
            // This is a common pattern if you only pass IDs between pages.
            // If restaurant object is passed from OrderSuccess, this might be redundant.
            if (restaurantId) {
                // Assuming you have a way to fetch restaurant details by ID, e.g., from your static data or another API
                // For now, let's use the local restaurantData for demonstration
                const foundRestaurant = restaurantData.find(r => r.id === restaurantId);
                if (foundRestaurant) {
                    setRestaurantName(foundRestaurant.name);
                }
            }

          } else {
            console.warn("⚠️ Invalid order data received:", data);
            setOrder(null);
          }

          // Simulate order status progression
          const interval = setInterval(() => {
            setCurrentStage(prev => {
              if (prev < statusStages.length - 1) {
                return prev + 1;
              } else {
                clearInterval(interval); // Stop interval once delivered
                return prev;
              }
            });
          }, 4000);

          return () => clearInterval(interval); // Cleanup on component unmount
        })
        .catch(err => {
          console.error("❌ Error fetching order:", err);
          setOrder(null); // Clear order on error
          // Optionally display an error message to the user
        });
    } else {
      console.warn("No orderId found in location state for TrackOrder.");
      setOrder(null); // Ensure order is null if no ID
    }
  }, [orderId, restaurantId]); // Add restaurantId to dependency array

  return (
    <div className="track-order-page">
      <Navbar isHomepage={false} isAuthenticated={true} />

      <div className="track-container">
        <h1>📍 Track Your Order</h1>

        {!order ? (
          <p>Loading order details or order not found...</p>
        ) : (
          <>
            <div className="order-status">
              {statusStages.map((stage, index) => (
                <div key={index} className={`status-step ${index <= currentStage ? "active" : ""}`}>
                  <div className="step-circle">{index + 1}</div>
                  <p>{stage}</p>
                </div>
              ))}
            </div>

            <div className="order-info">
              <h3>Order Summary (Order ID: {orderId})</h3> {/* Display Order ID */}

              <ul className="order-summary-list">
                {order.items.map((item, i) => (
                  <li key={i}>
                    🍽 <strong>{item.dish}</strong> from{" "}
                    <strong>{restaurantName}</strong> <br /> {/* Use restaurantName state */}
                    ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                  </li>
                ))}
              </ul>

              <p><strong>Total:</strong> ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</p>

              <div className="delivery-location">
                <h4>🛵 Delivery Guy Location:</h4>
                <p>{["Kitchen", "Koramangala", "BTM", "Your Area"][currentStage]}</p>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default TrackOrder;
