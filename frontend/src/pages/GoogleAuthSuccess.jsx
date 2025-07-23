import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const redirectPath = queryParams.get("redirect") || "/homepage";

    if (token) {
      localStorage.setItem("token", token);
      navigate(redirectPath);
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Logging you in...</h2>
    </div>
  );
};

export default GoogleAuthSuccess;
