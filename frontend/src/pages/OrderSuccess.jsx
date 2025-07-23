import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import restaurantData from "../data/restaurantData";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { restaurantId, orderId } = location.state || {};

  console.log("✅ Received in OrderSuccess:", { orderId, restaurantId });

  const [restaurant, setRestaurant] = useState(null);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // ✅ Fetch restaurant details directly
    if (restaurantId) {
      const found = restaurantData.find((r) => r.id === restaurantId);
      setRestaurant(found);
    }

    // ✅ Fetch order details from backend
    if (orderId) {
      fetch(`http://localhost:5000/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
          setOrder(data);
        })
        .catch(err => console.error("❌ Error fetching order:", err));
    }

    // ✅ Redirect manually if state data is missing
    if (!orderId || !restaurantId) {
      console.warn("⚠️ Missing navigation state! Redirecting...");
      navigate("/");
    }

  }, [restaurantId, orderId]);

  const handleTrackOrder = () => {
    console.log("🚀 Navigating with:", { orderId, restaurant });

    if (!orderId || !restaurant) {
      console.error("⚠️ Cannot navigate: Missing orderId or restaurant data.");
      return;
    }

    navigate("/track-order", { state: { orderId, restaurant } });
  };

  return (
    <div className="order-success-page">
      <Navbar isAuthenticated={true} isHomepage={false} />

      <div className="success-content">
        <div className="tick-container">
          <div className="tick-mark">✓</div>
        </div>
        <h1>Order Placed Successfully!</h1>
        <p>Your food is on the way 🚀</p>

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
    </div>
  );
};

export default OrderSuccess;
