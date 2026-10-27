import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { wishlist, cart, globalSearch, setGlobalSearch, theme, toggleTheme } =
    useAppFeatures();
  const { user, isAuthenticated, logout, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [q, setQ] = useState(globalSearch || "");

  useEffect(() => setQ(globalSearch || ""), [globalSearch]);

  const onChange = (e) => {
    const value = e.target.value;
    setQ(value);
    setGlobalSearch(value);
    if (value.trim().length > 0 && location.pathname !== "/products") {
      navigate("/products");
    }
  };

  const clearSearch = () => {
    setQ("");
    setGlobalSearch("");
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <nav className="attirex-nav">
      <div className="attirex-nav-container">
        {/* Left: Brand & Main Nav Links (Matches ATTIREX layout) */}
        <div className="attirex-nav-left">
          <Link className="attirex-brand" to="/">
            AVOCART
          </Link>
          <ul className="attirex-nav-menu">
            <li>
              <Link
                to="/"
                className={`attirex-nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className={`attirex-nav-link ${
                  location.pathname === "/products" ? "active" : ""
                }`}
              >
                Buy Now
              </Link>
            </li>
          </ul>
        </div>

        {/* Right: Search Input (icon on right) & Uniform Action Icons */}
        <div className="attirex-nav-right">
          <form
            className="attirex-search-form"
            onSubmit={(e) => {
              e.preventDefault();
              if (location.pathname !== "/products") navigate("/products");
            }}
          >
            <input
              type="text"
              className="attirex-search-input"
              placeholder="Search for items"
              value={q}
              onChange={onChange}
              aria-label="Search for items"
            />
            {q && (
              <button
                type="button"
                onClick={clearSearch}
                className="attirex-search-clear"
                title="Clear search"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
            <button
              type="submit"
              className="attirex-search-submit"
              aria-label="Search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>

          <div className="attirex-nav-icons">
            {/* User Profile / Sign In Icon (Matches ATTIREX PersonOutlineOutlinedIcon) */}
            <button
              type="button"
              onClick={handleProfileClick}
              className="attirex-icon-btn"
              title={
                isAuthenticated
                  ? `Profile (${user?.name || user?.email || "User"})`
                  : "Sign In / Profile"
              }
              aria-label="User Profile"
            >
              <svg
                width="23"
                height="23"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              {isAuthenticated && <span className="attirex-online-dot" />}
            </button>

            {/* Wishlist Icon */}
            <Link
              className="attirex-icon-btn"
              to="/wishlist"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlist.length > 0 && (
                <span className="attirex-badge">{wishlist.length}</span>
              )}
            </Link>

            {/* Shopping Bag / Cart Icon */}
            <Link
              className="attirex-icon-btn"
              to="/cart"
              title="Shopping Bag"
              aria-label="Shopping Cart"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {cart.length > 0 && (
                <span className="attirex-badge">{cart.length}</span>
              )}
            </Link>

            {/* Theme Toggle (Clean SVG outline icon matching navbar icons) */}
            <button
              type="button"
              onClick={toggleTheme}
              className="attirex-icon-btn"
              title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>

            {/* Logout Icon when authenticated */}
            {isAuthenticated && (
              <button
                id="btn-logout"
                type="button"
                onClick={handleLogout}
                className="attirex-icon-btn attirex-logout-btn"
                title="Logout"
                aria-label="Logout"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar */}
      <form
        className="attirex-mobile-search"
        onSubmit={(e) => {
          e.preventDefault();
          if (location.pathname !== "/products") navigate("/products");
        }}
      >
        <input
          type="text"
          className="attirex-search-input"
          placeholder="Search for items"
          value={q}
          onChange={onChange}
          aria-label="Mobile search for items"
        />
        {q && (
          <button
            type="button"
            onClick={clearSearch}
            className="attirex-search-clear"
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          className="attirex-search-submit"
          aria-label="Search"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </form>
    </nav>
  );
};

export default Header;
