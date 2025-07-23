import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./TrackOrder.css";

const statusStages = ["Order Placed", "Preparing", "Out for Delivery", "Delivered"];

const TrackOrder = () => {
  const location = useLocation();
  const { orderId, restaurant } = location.state || {};

  const [order, setOrder] = useState(null);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (orderId) {
      fetch(`http://localhost:5000/api/orders/${orderId}`)
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data.items)) {
            setOrder(data);
          } else {
            console.warn("⚠️ Invalid order data received:", data);
            setOrder(null);
          }

          const interval = setInterval(() => {
            setCurrentStage(prev => (prev < statusStages.length - 1 ? prev + 1 : prev));
          }, 4000);

          return () => clearInterval(interval);
        })
        .catch(err => {
          console.error("❌ Error fetching order:", err);
        });
    }
  }, [orderId]);

  return (
    <div className="track-order-page">
      <Navbar isHomepage={false} isAuthenticated={true} />

      <div className="track-container">
        <h1>📍 Track Your Order</h1>

        {!order ? (
          <p>Loading order details...</p>
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
              <h3>Order Summary</h3>

              <ul className="order-summary-list">
                {order.items.map((item, i) => (
                  <li key={i}>
                    🍽 <strong>{item.dish}</strong> from{" "}
                    <strong>{restaurant?.name || "Unknown"}</strong> <br />
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
