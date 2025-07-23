import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useParams,
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
import Login from "./components/Login&Signup/LoginModal";
import Signup from "./components/Login&Signup/SignupModal";
import Nightlife from "./pages/Homepage/Nightlife.jsx";
import Order from "./pages/Restaurant/Order.jsx";
import GoogleAuthSuccess from "./pages/GoogleAuthSuccess";
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

function AppInner() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleLogout = () => {
    console.log("Logging out...");
    localStorage.removeItem("token");
    navigate("/"); // 👈 Redirect to landing
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
        element={<OrderWrapper isAuthenticated={isAuthenticated} onLogout={handleLogout} />}
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
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/google-auth-success" element={<GoogleAuthSuccess />} />
      <Route path="/complete-profile" element={<CompleteProfile />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/track-order" element={<TrackOrder />} />
    </Routes>
  );
}

// ✅ App wrapped with Router
function AppWrapper() {
  return (
    <Router>
      <ScrollToTop />
      <AppInner />
    </Router>
  );
}

export default AppWrapper;
