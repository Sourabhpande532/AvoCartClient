import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const BASE_URL = process.env.REACT_APP_SERVER_URL || "http://localhost:4000";

const AuthModal = () => {
  const [tab, setTab] = useState("signin"); // 'signin' | 'signup'
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login, showAuthModal, setShowAuthModal } = useAuth();

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setShowAuthModal(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [setShowAuthModal]);

  if (!showAuthModal) return null;

  const handleChange = (e) => {
    setError("");
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/signin`, {
        email: formData.email,
        password: formData.password,
      });
      if (res.data.success) {
        login(res.data.data.token, res.data.data.user);
        setShowAuthModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign in failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/signup`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (res.data.success) {
        login(res.data.data.token, res.data.data.user);
        setShowAuthModal(false);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Sign up failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGuest = async () => {
    setError("");
    setSubmitting(true);
    try {
      const res = await axios.post(`${BASE_URL}/auth/guest`);
      if (res.data.success) {
        login(res.data.data.token, res.data.data.user);
        setShowAuthModal(false);
      }
    } catch (err) {
      setError("Guest login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogle = () => {
    // Note: OAuth causes a full page redirect.
    // The redirect callback will land on /auth/callback and handle login
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    window.location.href = `${BASE_URL}/auth/google`;
  };

  const handleGitHub = () => {
    sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
    window.location.href = `${BASE_URL}/auth/github`;
  };

  const closeModal = () => setShowAuthModal(false);

  // Stop click propagation when clicking inside the modal
  const stopPropagation = (e) => e.stopPropagation();

  return (
    <div className="auth-modal-overlay" onClick={closeModal}>
      <div className="auth-card modal-scale-in" onClick={stopPropagation}>
        {/* Close Button */}
        <button className="auth-close-btn" onClick={closeModal} title="Close">
          ✕
        </button>

        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">🛍️</div>
          <h2 className="auth-title">AvoCart</h2>
          <p className="auth-subtitle">Sign in to continue</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            id="tab-signin"
            className={`auth-tab ${tab === "signin" ? "active" : ""}`}
            onClick={() => { setTab("signin"); setError(""); }}
          >
            Sign In
          </button>
          <button
            id="tab-signup"
            className={`auth-tab ${tab === "signup" ? "active" : ""}`}
            onClick={() => { setTab("signup"); setError(""); }}
          >
            Sign Up
          </button>
        </div>

        {/* Error */}
        {error && <div className="auth-error">{error}</div>}

        {/* Sign In Form */}
        {tab === "signin" && (
          <form onSubmit={handleSignIn} className="auth-form" id="form-signin">
            <div className="auth-field">
              <label htmlFor="signin-email">Email</label>
              <input
                id="signin-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="signin-password">Password</label>
              <input
                id="signin-password"
                type="password"
                name="password"
                placeholder="Your password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
              />
            </div>
            <button id="btn-signin" type="submit" className="auth-btn-primary" disabled={submitting}>
              {submitting ? <span className="auth-spinner" /> : "Sign In"}
            </button>
          </form>
        )}

        {/* Sign Up Form */}
        {tab === "signup" && (
          <form onSubmit={handleSignUp} className="auth-form" id="form-signup">
            <div className="auth-field">
              <label htmlFor="signup-name">Full Name</label>
              <input
                id="signup-name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="auth-field">
              <label htmlFor="signup-email">Email</label>
              <input
                id="signup-email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
              />
            </div>
            <div className="auth-field">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                type="password"
                name="password"
                placeholder="Min. 6 characters"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </div>
            <button id="btn-signup" type="submit" className="auth-btn-primary" disabled={submitting}>
              {submitting ? <span className="auth-spinner" /> : "Create Account"}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="auth-divider"><span>or continue with</span></div>

        {/* Social + Guest buttons */}
        <div className="auth-social-grid">
          <button id="btn-google" className="auth-social-btn google" onClick={handleGoogle} disabled={submitting}>
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
            </svg>
            Google
          </button>
          <button id="btn-github" className="auth-social-btn github" onClick={handleGitHub} disabled={submitting}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>

        <button id="btn-guest" className="auth-guest-btn" onClick={handleGuest} disabled={submitting}>
          👤 Continue as Guest
        </button>

        <p className="auth-terms">
          By continuing, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
