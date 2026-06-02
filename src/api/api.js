import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "https://avo-cart-server.vercel.app/api",
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default API;
