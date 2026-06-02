import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function AppContent() {
    const { alert, setAlert, loading, theme } = useAppFeatures();

    useEffect(() => {
        document.documentElement.setAttribute("data-bs-theme", theme);
    }, [theme]);

    return (
        <div className={`app-container ${theme} d-flex flex-column min-vh-100`}>
            <Header />
            <Alerts alert={alert} onClear={() => setAlert([])} />
            <div className="mt-4 flex-grow-1">
                {loading ? <Loading /> : (
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home />} />
                        <Route path="/auth/callback" element={<OAuthCallback />} />

                        {/* Protected routes */}
                        <Route path="/products" element={<ProtectedRoute><ProductListing /></ProtectedRoute>} />
                        <Route path="/products/:id" element={<ProtectedRoute><ProductDetails /></ProtectedRoute>} />
                        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
                        <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
                        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
                    </Routes>
                )}
            </div>
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
