import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import LogoutPopup from "../LogoutPopup";
import restaurantData from "../../data/restaurantData";
import "./Order.css";

const Order = ({ isAuthenticated, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const restaurant = restaurantData.find((rest) => rest.id === id);

  // Retrieve API_BASE_URL from environment variables
  // This should be 'https://bitescape.onrender.com' when deployed
  // and 'http://localhost:5173' (or 3000) for your frontend dev server.
  // The backend API URL is what we need here.
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'; // Fallback for local testing

  const [cart, setCart] = useState([]);
  const [popupStep, setPopupStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedUPI, setSelectedUPI] = useState("");
  const [address, setAddress] = useState({
    name: "", phone: "", email: "",
    line1: "", line2: "", city: "", state: "", pincode: "", notes: ""
  });

  const [showLogoutPopup, setShowLogoutPopup] = useState(false);
  const popupRef = useRef();

  const handleLogout = () => setShowLogoutPopup(true);
  const handleConfirmLogout = () => {
    setShowLogoutPopup(false);
    onLogout();
  };
  const handleCancelLogout = () => setShowLogoutPopup(false);

  const addToCart = async (item) => {
    const exists = cart.find((c) => c.dish === item.dish);
    const updatedCart = exists
      ? cart.map((c) => c.dish === item.dish ? { ...c, quantity: c.quantity + 1 } : c)
      : [...cart, { ...item, quantity: 1 }];

    setCart(updatedCart);

    // No need for googleMapsEmbedUrl here, it's used in the JSX below.
    // const googleMapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`;

    try {
      const userId = localStorage.getItem("userId") || "test-user-123"; // Get user ID
      const token = localStorage.getItem("token"); // Get token for authorization

      // IMPORTANT: Use API_BASE_URL for the cart API call
      const response = await fetch(`${API_BASE_URL}/api/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include Authorization header for protected routes
        },
        body: JSON.stringify({
          userId: userId,
          item: {
            foodId: item.dish,
            restaurantId: restaurant.id,
            quantity: 1
          }
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ Error adding to cart (backend):", response.status, errorData);
        // Optionally show a user-friendly message
      }

    } catch (error) {
      console.error("❌ Error saving to DB (frontend fetch error):", error);
      // Optionally show a user-friendly message
    }
  };

  const updateQuantity = (item, change) => {
    const existing = cart.find((c) => c.dish === item.dish);
    if (!existing) return;
    const updatedQty = existing.quantity + change;
    if (updatedQty <= 0) {
      setCart(cart.filter((c) => c.dish !== item.dish));
    } else {
      setCart(cart.map((c) => c.dish === item.dish ? { ...c, quantity: updatedQty } : c));
    }
    // TODO: Consider adding a backend call here to update cart quantity in DB
  };

  const getTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrderNow = () => {
    if (cart.length === 0) {
      // Replaced alert with a more user-friendly message or modal if preferred
      // For now, keeping alert as per original code, but consider a custom modal.
      alert("Please add at least one item to cart!");
      return;
    }
    setPopupStep(1);
  };

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const proceedToPaymentModes = () => {
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      alert("Please fill in all required fields."); // Consider custom modal
      return;
    }
    setPopupStep(2);
  };

  const proceedToPaymentDetails = (method) => {
    setPaymentMethod(method);
    setPopupStep(3);
  };

  const simulatePayment = async () => {
    setPopupStep(4); // Show "Payment Successful" message immediately
    
    try {
      const userId = localStorage.getItem("userId") || "test-user-123"; // Get user ID
      const token = localStorage.getItem("token"); // Get token for authorization

      // IMPORTANT: Use API_BASE_URL for the orders API call
      const response = await fetch(`${API_BASE_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // Include Authorization header
        },
        body: JSON.stringify({
          userId: userId,
          restaurantId: restaurant.id,
          items: cart.map(item => ({ // Ensure items match backend OrderSchema
            dish: item.dish,
            quantity: item.quantity,
            price: item.price
          })),
          address,
          paymentMethod
        })
      });
      
      if (!response.ok) { // Check for HTTP errors (e.g., 400, 500)
        const errorData = await response.json();
        console.error("❌ Order submission failed with status:", response.status, errorData);
        alert(`Order failed: ${errorData.message || 'Server error'}`); // Show error to user
        setPopupStep(0); // Close popup or show an error state
        return; // Stop execution
      }

      const data = await response.json();

      if (data && data._id) {
        // ✅ Store items for OrderSuccess page
        localStorage.setItem("orderedItems", JSON.stringify(cart));
        localStorage.setItem("lastOrderId", data._id); // Store order ID if needed elsewhere

        console.log("🚀 Order submitted successfully. Navigating to OrderSuccess.jsx with:", data._id);
        
        // Redirect after a short delay to allow "Payment Successful" message to be seen
        setTimeout(() => {
          navigate("/order-success", { state: { orderId: data._id, restaurantId: restaurant.id } });
          setCart([]); // Clear cart after successful order and navigation
        }, 1500); // Reduced timeout to 1.5 seconds for quicker redirection
      } else {
        console.error("❌ Order submission failed: No _id in response", data);
        alert("Order failed: Invalid response from server.");
        setPopupStep(0); // Close popup or show an error state
      }
    } catch (err) {
      console.error("❌ Payment simulation error (network/unexpected):", err);
      alert("An error occurred during payment. Please check your internet connection and try again.");
      setPopupStep(0); // Close popup or show an error state
    }
  };
  

  const closePopup = () => {
    setPopupStep(0);
    setPaymentMethod("");
    setSelectedBank("");
    setSelectedUPI("");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        closePopup();
      }
    };
    if (popupStep !== 0) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popupStep]);

  if (!restaurant) {
    return <div className="order-page"><Navbar /><h1>Restaurant Not Found</h1></div>;
  }

  return (
    <div className="order-page">
      <Navbar isAuthenticated={isAuthenticated} isHomepage={true} onLogout={handleLogout} />

      <header className="order-header">
        <h1 className="restaurant-name">{restaurant.name}</h1>
        <div className="restaurant-tags">
          {restaurant.cuisines.split(",").map((cuisine, i) => <span key={i} className="tag">{cuisine.trim()}</span>)}
        </div>
        <p>{restaurant.address}</p>
        <p>📞 {restaurant.contact}</p>
        <p>🕒 {restaurant.timing}</p>
        <p>⭐ {restaurant.rating.dining} Dining | ⭐ {restaurant.rating.delivery} Delivery</p>
      </header>

      <div className="order-main">
        {/* 📸 Updated Gallery Section */}
        <div className="gallery-section">
          <div className="main-image">
            <img src={restaurant.image} alt={restaurant.name} />
          </div>

          <div className="side-gallery">
            {restaurant.gallery?.slice(0, 2).map((img, index) => (
              <img key={index} src={img} alt={`Gallery ${index + 1}`} />
            ))}
            <button className="view-gallery-btn">View Gallery</button>
          </div>
        </div>

        <div className="popular-dishes">
          <h3>Popular Dishes</h3>
          <div className="dishes-scroll">
            {restaurant.menu.slice(0, 6).map((item, index) => (
              <div key={index} className="dish-card">
                {item.dish}
              </div>
            ))}
          </div>
        </div>

        <div className="order-main">
          <h2>Menu</h2>
          <ul className="menu-list">
            {restaurant.menu.map((item, index) => {
              const quantity = cart.find(c => c.dish === item.dish)?.quantity || 0;
              return (
                <li key={index} className="menu-item">
                  <span>{item.dish} - ₹{item.price}</span>
                  {quantity === 0 ? (
                    <button className="add-btn" onClick={() => addToCart(item)}>Add to Cart</button>
                  ) : (
                    <div className="quantity-control">
                      <button onClick={() => updateQuantity(item, -1)}>-</button>
                      <span>{quantity}</span>
                      <button onClick={() => updateQuantity(item, 1)}>+</button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
          
          {cart.length > 0 && (
            <div className="cart-summary">
              <h3>🛒 Cart Summary</h3>
              {cart.map((item, i) => (
                <p key={i}>{item.dish} × {item.quantity} = ₹{item.price * item.quantity}</p>
              ))}
              <strong>Total: ₹{getTotal()}</strong>
              <button className="order-now-button" onClick={handleOrderNow}>Proceed</button>
            </div>
          )}
        </div>
      </div>

      {popupStep !== 0 && (
        <div className="popup-overlay">
          <div className="popup-content" ref={popupRef}>
            {popupStep === 1 && (
              <>
                <h3>🚚 Delivery Details</h3>
                <input name="name" placeholder="Full Name" onChange={handleAddressChange} />
                <input name="phone" placeholder="Phone Number" onChange={handleAddressChange} />
                <input name="email" placeholder="Email" onChange={handleAddressChange} />
                <input name="line1" placeholder="Address Line 1" onChange={handleAddressChange} />
                <input name="city" placeholder="City" onChange={handleAddressChange} />
                <input name="pincode" placeholder="Pincode" onChange={handleAddressChange} />
                <textarea name="notes" placeholder="Notes" onChange={handleAddressChange}></textarea>
                <button className="pay-button" onClick={proceedToPaymentModes}>Next</button>
              </>
            )}

            {popupStep === 2 && (
              <>
                <h3>💳 Select Payment Method</h3>
                <div className="payment-options">
                  <button onClick={() => proceedToPaymentDetails("card")}>💳 Card</button>
                  <button onClick={() => proceedToPaymentDetails("netbanking")}>🏦 Net Banking</button>
                  <button onClick={() => proceedToPaymentDetails("upi")}>📱 UPI</button>
                </div>
              </>
            )}

            {popupStep === 3 && (
              <>
                <h3>Enter {paymentMethod === "card" ? "Card Details" :
                          paymentMethod === "netbanking" ? "Select Bank" :
                          "UPI Details"}</h3>

                {paymentMethod === "card" && (
                  <>
                    <input placeholder="Card Number" />
                    <input placeholder="Name on Card" />
                    <input placeholder="MM/YY" />
                    <input placeholder="CVV" />
                  </>
                )}
                {paymentMethod === "netbanking" && (
                  <select onChange={(e) => setSelectedBank(e.target.value)}>
                    <option value="">Select Bank</option>
                    <option>SBI</option><option>ICICI</option><option>HDFC</option><option>Axis</option>
                  </select>
                )}
                {paymentMethod === "upi" && (
                  <>
                    <div className="upi-logos">
                      <img src="https://i.pinimg.com/474x/ae/5f/e3/ae5fe3dc423e44c0ddbef5dc64fa356b.jpg" alt="PhonePe" height="30" />
                      <img src="https://animationvisarts.com/wp-content/uploads/2023/11/Frame-43-1.png" alt="GPay" height="30" />
                      <img src="https://www.logo.wine/a/logo/Paytm/Paytm-Logo.wine.svg" alt="Paytm" height="30" />
                    </div>
                    <input placeholder="Enter UPI ID" />
                  </>
                )}
                <button className="pay-button" onClick={simulatePayment}>Pay ₹{getTotal()}</button>
              </>
            )}

            {popupStep === 4 && (
              <>
                <h2>✅ Payment Successful!</h2>
                <p>Redirecting to Order Placed page...</p>
              </>
            )}
          </div>
        </div>
      )}

      {showLogoutPopup && (
        <LogoutPopup onConfirm={handleConfirmLogout} onCancel={handleCancelLogout} />
      )}

      {/* ✅ Google Maps Embed */}
      {restaurant.address && (
          <iframe
            src={`https://www.google.com/maps?q=${encodeURIComponent(restaurant.address)}&output=embed`}
            width="100%"
            height="300"
            style={{ borderRadius: "10px", border: "none" }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        )}

      <Footer />
    </div>
  );
};

export default Order;
