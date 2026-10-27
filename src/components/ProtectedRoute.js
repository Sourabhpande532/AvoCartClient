import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import Loading from "./Loading";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, authLoading, setShowAuthModal } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      const justLoggedOut = sessionStorage.getItem("avocart_logged_out");
      if (justLoggedOut) {
        sessionStorage.removeItem("avocart_logged_out");
      } else {
        setShowAuthModal(true);
      }
    }
  }, [authLoading, isAuthenticated, setShowAuthModal]);

  if (authLoading) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
