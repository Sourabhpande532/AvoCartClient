import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useCallback, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/NavbarComp";
import { Home } from "./pages/Home";
import { Wishlist } from "./pages/Wishlist";
import { CartPage } from "./pages/CartPage";
import { AppProvider, useAppFeatures } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { ProductListing } from "./pages/ProductListing";
import { ProductDetails } from "./pages/ProductDetails";
import { Profile } from "./pages/Profile";
import { Checkout } from "./pages/Checkout";
import Alerts from "./components/Alerts";
import Loading from "./components/Loading";
import Footer from "./components/Footer";
import ChatBoat from "./components/ChatBoat";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthModal from "./pages/Auth/AuthModal";
import OAuthCallback from "./pages/Auth/OAuthCallback";

function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, search]);
  return null;
}

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="container py-5 text-center fade-in">
      <div className="attirex-card p-5 mx-auto" style={{ maxWidth: "520px" }}>
        <div className="display-4 fw-bold mb-2" style={{ fontFamily: "var(--font-serif)" }}>
          404
        </div>
        <h3 className="fw-bold mb-2 text-body" style={{ fontFamily: "var(--font-serif)" }}>
          Page Not Found
        </h3>
        <p className="text-muted small mb-4">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <button
            type="button"
            className="attirex-btn-primary w-auto px-4"
            onClick={() => navigate("/")}
          >
            Back to Home
          </button>
          <button
            type="button"
            className="attirex-btn-outline w-auto px-4"
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>
        </div>
      </div>
    </div>
  );
}

function AppContent() {
  const { alert, setAlert, loading, theme, pushAlert } = useAppFeatures();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const errorParam = params.get("error");
    if (errorParam) {
      pushAlert({
        type: "error",
        text: "Authentication failed. Please try signing in again.",
      });
      navigate(location.pathname === "/auth" ? "/" : location.pathname, { replace: true });
    }
  }, [location.pathname, location.search, navigate, pushAlert]);

  const handleClearAlert = useCallback(
    (id) => {
      if (id) {
        setAlert((prev) => prev.filter((item) => item.id !== id));
      } else {
        setAlert([]);
      }
    },
    [setAlert]
  );

  return (
    <div className={`app-container ${theme} d-flex flex-column min-vh-100`}>
      <ScrollToTop />
      <Header />
      <Alerts alert={alert} onClear={handleClearAlert} />
      <main className="middle-content flex-grow-1">
        {loading ? (
          <Loading />
        ) : (
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<OAuthCallback />} />
            <Route path="/auth/callback" element={<OAuthCallback />} />
            <Route path="/products" element={<ProductListing />} />
            <Route path="/products/:id" element={<ProductDetails />} />

            {/* Protected routes */}
            <Route
              path="/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        )}
      </main>
      <Footer />
      <ChatBoat />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
