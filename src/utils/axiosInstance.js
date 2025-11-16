import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://e-commerce-shopify-backend.onrender.com/api",   // your backend URL
});

// Attach token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
