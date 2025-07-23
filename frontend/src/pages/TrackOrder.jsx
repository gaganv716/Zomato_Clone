import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogoutPopup from "../pages/LogoutPopup"; // Make sure path is correct
import restaurantData from "../data/restaurantData"; 
import "./TrackOrder.css";

const statusStages = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

// TrackOrder now receives isAuthenticated and onLogout as props from App.jsx
const TrackOrder = ({ isAuthenticated, onLogout }) => { 
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, restaurantId } = location.state || {}; 

  const [order, setOrder] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);
  const [restaurantName, setRestaurantName] = useState("Unknown Restaurant"); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // State for Logout Popup (managed locally within this component)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false);

  // Handlers for Logout Popup
  const handleLogout = () => setShowLogoutPopup(true); // This local handler just shows the popup
  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    onLogout(); // This calls the onLogout prop received from App.jsx
    navigate("/"); // Redirect to homepage after logout
  };
  const handleCancelLogout = () => setShowLogoutPopup(false);

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; 

  useEffect(() => {
    const fetchOrderAndRestaurant = async () => {
      setLoading(true);
      setError(null);

      if (!orderId) {
        console.warn("No orderId found in location state for TrackOrder. Redirecting to homepage.");
        setOrder(null);
        setLoading(false);
        setError("No order ID provided. Redirecting to homepage.");
        setTimeout(() => navigate("/"), 2000); 
        return;
      }

      try {
        const orderResponse = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
        if (!orderResponse.ok) {
          throw new Error(`HTTP error fetching order! status: ${orderResponse.status}`);
        }
        const orderData = await orderResponse.json();

        if (orderData && Array.isArray(orderData.items)) {
          setOrder(orderData);

          if (restaurantId) {
            const foundRestaurant = restaurantData.find(r => r.id === restaurantId);
            if (foundRestaurant) {
              setRestaurantName(foundRestaurant.name);
            } else {
              console.warn(`Restaurant with ID "${restaurantId}" not found in local restaurantData.`);
              setRestaurantName("Unknown Restaurant (ID not found)");
            }
          } else if (orderData.restaurantId) { 
              const foundRestaurant = restaurantData.find(r => r.id === orderData.restaurantId);
              if (foundRestaurant) {
                  setRestaurantName(foundRestaurant.name);
              } else {
                  console.warn(`Restaurant with ID "${orderData.restaurantId}" from order data not found in local restaurantData.`);
                  setRestaurantName("Unknown Restaurant (ID from order not found)");
              }
          } else {
              console.warn("No restaurantId provided in state or order data.");
              setRestaurantName("Unknown Restaurant (ID missing)");
          }

          const interval = setInterval(() => {
            setCurrentStage(prev => {
              if (prev < statusStages.length - 1) {
                return prev + 1;
              } else {
                clearInterval(interval); 
                return prev;
              }
            });
          }, 4000);

          return () => clearInterval(interval);

        } else {
          console.warn("⚠️ Invalid order data received:", orderData);
          setOrder(null);
          setError("Invalid order data received from server.");
        }
      } catch (err) {
        console.error("❌ Error fetching order or restaurant:", err);
        setOrder(null);
        setError(`Failed to load order: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndRestaurant();

  }, [orderId, restaurantId, API_BASE_URL, navigate]); 

  return (
    <div className="track-order-page">
      {/* Pass isAuthenticated and handleLogout to Navbar */}
      <Navbar isHomepage={false} isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      <div className="track-container">
        <h1>📍 Track Your Order</h1>

        {loading ? (
          <p>Loading order details...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : !order ? (
          <p>Order details could not be loaded. Please try again later.</p>
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
              <h3>Order Summary (Order ID: {orderId})</h3> 

              <ul className="order-summary-list">
                {order.items.map((item, i) => (
                  <li key={i}>
                    🍽 <strong>{item.dish}</strong> from{" "}
                    <strong>{restaurantName}</strong> <br /> 
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

      {/* Logout Popup */}
      {showLogoutPopup && (
        <LogoutPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </div>
  );
};

export default TrackOrder;
