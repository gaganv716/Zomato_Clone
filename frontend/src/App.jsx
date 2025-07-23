import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
  useLocation // Ensure useLocation is imported
} from "react-router-dom";

import Home from "./pages/Home";
import Homepage from "./pages/Homepage/Homepage.jsx";
import Dining from "./pages/Homepage/Dining.jsx";
import BitescapeApp from "./components/BitescapeApp";
import AddRestaurantNav from "./components/AddRestaurant/AddRestaurantNav";
import AddRestBanner from "./components/AddRestaurant/AddRestBanner";
import Partner from "./components/AddRestaurant/Partner";
import Success from "./components/AddRestaurant/Success";
import FrequentQues from "./components/AddRestaurant/FrequentQues";
import Footer from "./components/Footer";
import LoginModal from "./components/Login&Signup/LoginModal";
import SignupModal from "./components/Login&Signup/SignupModal";
import Nightlife from "./pages/Homepage/Nightlife.jsx";
import Order from "./pages/Restaurant/Order.jsx";
import CompleteProfile from "./pages/CompleteProfile";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder.jsx";

import ScrollToTop from "./components/ScrollToTop";

// Wrapper for passing props to Order page
const OrderWrapper = ({ isAuthenticated, onLogout }) => {
  const { id } = useParams();
  return (
    <Order id={id} isAuthenticated={isAuthenticated} onLogout={onLogout} />
  );
};

// Component to handle Google OAuth success and update auth state
const GoogleAuthSuccessHandler = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const redirectPath = params.get('redirect');

    console.log("GoogleAuthSuccessHandler: useEffect triggered");
    console.log("Token received:", token ? "Yes" : "No", "Token value (first 10 chars):", token ? token.substring(0,10) : 'N/A');
    console.log("Redirect path:", redirectPath);

    if (token) {
      console.log("Token found, attempting login success and navigation.");
      onLoginSuccess(token); // This sets localStorage and updates isAuthenticated state in AppInner

      // Add a small delay before navigation to ensure state updates propagate
      // and React has a chance to re-render the AppInner with new auth state.
      // This often resolves subtle race conditions in deployed environments.
      const timer = setTimeout(() => {
        console.log("Navigating to:", redirectPath || '/homepage');
        navigate(redirectPath || '/homepage');
      }, 50); // A very small delay (50ms)

      return () => clearTimeout(timer); // Cleanup the timer if component unmounts
    } else {
      console.error("No token received after Google authentication, redirecting to login.");
      navigate('/login');
    }
  }, [location, navigate, onLoginSuccess]); // Added onLoginSuccess to dependencies

  return <p>Authenticating with Google...</p>;
};


function AppInner() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    // Listen for changes in localStorage (e.g., from other tabs or direct manipulation)
    window.addEventListener('storage', checkAuthStatus);
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true); // This updates the state
    console.log("handleLoginSuccess: isAuthenticated set to true.");
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("orderedItems");
    localStorage.removeItem("lastOrderId");
    setIsAuthenticated(false);
    navigate("/"); // Redirect to landing page after logout
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Home isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      />
      <Route
        path="/homepage"
        element={<Homepage isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      />
      <Route
        path="/dining"
        element={<Dining isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      />
      <Route
        path="/nightlife"
        element={<Nightlife isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
      />
      <Route
        path="/order/:id"
        element={isAuthenticated ? <OrderWrapper isAuthenticated={isAuthenticated} onLogout={handleLogout} /> : <Navigate to="/" />}
      />
      <Route path="/get-app" element={<BitescapeApp />} />
      <Route
        path="/add-restaurant"
        element={
          <>
            <AddRestaurantNav />
            <AddRestBanner />
            <Partner />
            <Success />
            <FrequentQues />
            <Footer />
          </>
        }
      />
      {/* Login and Signup modals are typically rendered conditionally, not as full routes */}
      {/* If these are actual pages, they should also receive isAuthenticated/onLogout if they have a Navbar */}
      <Route path="/login" element={<LoginModal /* props */ />} /> 
      <Route path="/signup" element={<SignupModal /* props */ />} />

      {/* GoogleAuthSuccess now uses a wrapper to pass the onLoginSuccess handler */}
      <Route path="/google-auth-success" element={<GoogleAuthSuccessHandler onLoginSuccess={handleLoginSuccess} />} />
      
      {/* IMPORTANT: Pass isAuthenticated and onLogout to these routes */}
      <Route 
        path="/complete-profile" 
        element={isAuthenticated ? <CompleteProfile isAuthenticated={isAuthenticated} onLogout={handleLogout} /> : <Navigate to="/" />} 
      />
      <Route 
        path="/order-success" 
        element={isAuthenticated ? <OrderSuccess isAuthenticated={isAuthenticated} onLogout={handleLogout} /> : <Navigate to="/" />} 
      />
      <Route 
        path="/track-order" 
        element={isAuthenticated ? <TrackOrder isAuthenticated={isAuthenticated} onLogout={handleLogout} /> : <Navigate to="/" />} 
      />
    </Routes>
  );
}

// App wrapped with Router
function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <AppInner />
    </Router>
  );
}

export default AppWrapper;
