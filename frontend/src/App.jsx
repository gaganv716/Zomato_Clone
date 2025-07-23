import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
  Navigate,
  useLocation,
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

const OrderWrapper = ({ isAuthenticated, onLogout }) => {
  const { id } = useParams();
  return (
    <Order id={id} isAuthenticated={isAuthenticated} onLogout={onLogout} />
  );
};

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
      onLoginSuccess(token); // Call the AppInner's login success handler

      // Use a small delay for navigation to ensure state updates propagate
      const timer = setTimeout(() => {
        console.log("Navigating to:", redirectPath || '/homepage');
        navigate(redirectPath || '/homepage');
      }, 50); 

      return () => clearTimeout(timer); 
    } else {
      console.error("No token received after Google authentication, redirecting to login.");
      navigate('/login');
    }
  }, [location, navigate, onLoginSuccess]);

  return <p>Authenticating with Google...</p>;
};


function AppInner() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem("token"));
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control LoginModal visibility
  const [showSignupModal, setShowSignupModal] = useState(false); // State to control SignupModal visibility

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
    console.log("handleLoginSuccess: isAuthenticated set to true.");
    setShowLoginModal(false); // Close login modal on success
    setShowSignupModal(false); // Ensure signup modal is also closed
  };

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    localStorage.removeItem("userId"); // Ensure userId is cleared if stored
    localStorage.removeItem("orderedItems");
    localStorage.removeItem("lastOrderId");
    setIsAuthenticated(false);
    navigate("/");
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowSignupModal(false); // Close signup if open
  };

  const openSignupModal = () => {
    setShowSignupModal(true);
    setShowLoginModal(false); // Close login if open
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowSignupModal(false);
  };


  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home isAuthenticated={isAuthenticated} onLogout={handleLogout} onLoginClick={openLoginModal} onSignupClick={openSignupModal} />}
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
        {/* These routes for modals are likely redundant if modals are rendered conditionally */}
        {/* If you intend them as full pages, ensure they have their own Navbar and receive props */}
        {/* <Route path="/login" element={<LoginModal />} /> */}
        {/* <Route path="/signup" element={<SignupModal />} /> */}

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

      {/* Conditionally render Login and Signup Modals based on state */}
      {showLoginModal && (
        <LoginModal
          show={showLoginModal}
          handleClose={closeModals}
          handleSignUp={openSignupModal} // Callback to switch to signup
          onLoginSuccess={handleLoginSuccess} // Pass the success handler
        />
      )}
      {showSignupModal && (
        <SignupModal
          show={showSignupModal}
          handleClose={closeModals}
          handleLogin={openLoginModal} // Callback to switch to login
          onSignupSuccess={handleLoginSuccess} // Pass the success handler (signup is also a form of login)
        />
      )}
    </>
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
