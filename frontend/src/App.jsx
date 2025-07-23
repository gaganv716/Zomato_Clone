import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
  useLocation // <--- ADD THIS IMPORT
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
// import GoogleAuthSuccess from "./pages/GoogleAuthSuccess"; // This is now wrapped by GoogleAuthSuccessHandler
import CompleteProfile from "./pages/CompleteProfile";
import OrderSuccess from "./pages/OrderSuccess";
import TrackOrder from "./pages/TrackOrder.jsx";

import ScrollToTop from "./components/ScrollToTop";

// ✅ Wrapper for passing props to Order page
const OrderWrapper = ({ isAuthenticated, onLogout }) => {
  const { id } = useParams();
  return (
    <Order id={id} isAuthenticated={isAuthenticated} onLogout={onLogout} />
  );
};

// Component to handle Google OAuth success and update auth state
const GoogleAuthSuccessHandler = ({ onLoginSuccess }) => {
  const navigate = useNavigate();
  const location = useLocation(); // <--- This line now has useLocation defined

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const redirectPath = params.get('redirect');

    if (token) {
      onLoginSuccess(token);
      navigate(redirectPath || '/homepage');
    } else {
      console.error("No token received after Google authentication.");
      navigate('/login');
    }
  }, [location, navigate, onLoginSuccess]);

  return <p>Authenticating with Google...</p>;
};


function AppInner() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const checkAuthStatus = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener('storage', checkAuthStatus);
    return () => {
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("orderedItems");
    localStorage.removeItem("lastOrderId");
    setIsAuthenticated(false);
    navigate("/");
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
      <Route path="/login" element={<LoginModal />} /> 
      <Route path="/signup" element={<SignupModal />} />

      <Route path="/google-auth-success" element={<GoogleAuthSuccessHandler onLoginSuccess={handleLoginSuccess} />} />
      
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

function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <AppInner />
    </Router>
  );
}

export default AppWrapper;
