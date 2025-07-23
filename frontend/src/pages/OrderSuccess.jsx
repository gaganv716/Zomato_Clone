import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import restaurantData from "../data/restaurantData"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import LogoutPopup from "../pages/LogoutPopup"; 
import "./OrderSuccess.css";

// OrderSuccess now receives isAuthenticated and onLogout as props from App.jsx
const OrderSuccess = ({ isAuthenticated, onLogout }) => { 
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantId, orderId } = location.state || {};

  console.log("✅ Received in OrderSuccess:", { orderId, restaurantId });

  const [restaurant, setRestaurant] = useState(null);
  const [order, setOrder] = useState(null);
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
    const fetchOrderAndRestaurantDetails = async () => {
      setLoading(true);
      setError(null);

      if (!orderId || !restaurantId) {
        console.warn("⚠️ Missing navigation state! Redirecting to homepage...");
        setError("Missing order or restaurant ID. Redirecting.");
        setTimeout(() => navigate("/"), 2000); 
        setLoading(false);
        return;
      }

      try {
        const foundRestaurant = restaurantData.find((r) => r.id === restaurantId);
        if (foundRestaurant) {
          setRestaurant(foundRestaurant);
        } else {
          console.warn(`Restaurant with ID "${restaurantId}" not found in local restaurantData.`);
          setError(`Restaurant with ID "${restaurantId}" not found.`);
        }

        const orderResponse = await fetch(`${API_BASE_URL}/api/orders/${orderId}`);
        if (!orderResponse.ok) {
          throw new Error(`HTTP error fetching order! status: ${orderResponse.status}`);
        }
        const orderData = await orderResponse.json();
        
        if (orderData && Array.isArray(orderData.items)) {
          setOrder(orderData);
        } else {
          console.warn("⚠️ Invalid order data received:", orderData);
          setError("Invalid order data received from server.");
        }

      } catch (err) {
        console.error("❌ Error fetching order or restaurant:", err);
        setError(`Failed to load details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndRestaurantDetails();

  }, [restaurantId, orderId, navigate, API_BASE_URL]); 

  const handleTrackOrder = () => {
    console.log("🚀 Navigating to Track Order with:", { orderId, restaurantId }); 
    if (!orderId || !restaurantId) { 
      console.error("⚠️ Cannot navigate: Missing orderId or restaurantId.");
      alert("Cannot track order: Missing essential details."); 
      return;
    }
    navigate("/track-order", { state: { orderId, restaurantId } }); 
  };

  return (
    <div className="order-success-page">
      {/* Pass isAuthenticated and handleLogout to Navbar */}
      <Navbar isAuthenticated={isAuthenticated} isHomepage={false} onLogout={handleLogout} />

      <div className="success-content">
        <div className="tick-container">
          <div className="tick-mark">✓</div>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Your food is on the way 🚀</p>

        {loading ? (
          <p>Loading order details...</p>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : (
          <>
            {orderId && restaurant && ( 
              <button className="track-order-btn" onClick={handleTrackOrder}>
                Track Your Order
              </button>
            )}

            {restaurant && (
              <div className="success-restaurant-info">
                <h3>Ordered From:</h3>
                <div className="success-restaurant-card">
                  <img src={restaurant.image} alt={restaurant.name} />
                  <div>
                    <h4>{restaurant.name}</h4>
                    <p>{restaurant.address}</p>
                    <p>{restaurant.contact}</p>
                  </div>
                </div>
              </div>
            )}

            {order && order.items?.length > 0 && (
              <div className="success-order-summary">
                <h3>🛒 Your Order:</h3>
                <ul>
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.dish} × {item.quantity} = ₹{item.price * item.quantity}
                    </li>
                  ))}
                </ul>
                <strong>Total: ₹{order.items.reduce((sum, item) => sum + item.price * item.quantity, 0)}</strong>
              </div>
            )}
          </>
        )}

        <div className="success-suggestions">
          <h3>Explore More Restaurants</h3>
          <div className="success-grid-cards">
            {restaurantData.map((r, index) => (
              <div key={index} className="success-suggestion-card">
                <img src={r.image} alt={r.name} />
                <h4>{r.name}</h4>
                <p>{r.cuisines}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />

      {/* Logout Popup */}
      {showLogoutPopup && (
        <LogoutPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}
    </div>
  );
};

export default OrderSuccess;
