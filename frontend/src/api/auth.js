import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`; // ✅ Uses environment variable

// Signup Function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data; // This includes user info & token
  } catch (error) {
    console.error("Signup error:", error.response?.data);
    throw error;
  }
};

// Login Function
export const login = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data);
    throw error;
  }
};
