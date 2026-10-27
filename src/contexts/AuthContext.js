import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const BASE_URL = process.env.REACT_APP_SERVER_URL || "https://avo-cart-server.vercel.app";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Restore session from localStorage on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get(`${BASE_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (res.data.success) setUser(res.data.data.user);
          else logout(true);
        })
        .catch(() => logout(true))
        .finally(() => setAuthLoading(false));
    } else {
      setAuthLoading(false);
    }
  }, []);

  const login = (token, userData) => {
    sessionStorage.removeItem("avocart_logged_out");
    localStorage.setItem("authToken", token);
    setUser(userData);
  };

  const logout = (silent = false) => {
    if (!silent) {
      sessionStorage.setItem("avocart_logged_out", "1");
    }
    localStorage.removeItem("authToken");
    setUser(null);
    setShowAuthModal(false);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, isAuthenticated, authLoading, showAuthModal, setShowAuthModal }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };
