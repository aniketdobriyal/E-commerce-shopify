import axios from "axios";

//    const API_URL = "http://localhost:5000/api/auth"; // backend URL 
const API_URL = "https://e-commerce-shopify-backend.onrender.com/api/auth"; // backend URL 

// Login
export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data;
};

// Register
export const registerUser = async (name, email, password, phone) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password, phone });
  return response.data;
};

// Verify email
export const verifyUser = async (token) => {
  const response = await axios.get(`${API_URL}/verify/${token}`);
  return response.data;
};
