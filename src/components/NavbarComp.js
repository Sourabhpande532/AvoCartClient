import { Link, useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { wishlist, cart, globalSearch, setGlobalSearch, theme, toggleTheme } = useAppFeatures();
  const { user, isAuthenticated, logout, setShowAuthModal } = useAuth();
  const navigate = useNavigate();
  const [q, setQ] = useState(globalSearch || "");

  useEffect(() => setQ(globalSearch || ""), [globalSearch]);

  const onChange = (e) => {
    const value = e.target.value;
    setQ(value);
    setGlobalSearch(value);
    if (value.trim().length > 0 && window.location.pathname !== "/products") {
      navigate("/products");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fs-3" to="/">
          AvoCart
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
          aria-controls="navContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Content */}
        <div className="collapse navbar-collapse" id="navContent">

          {/* Search Bar */}
          <div className="mx-auto my-3 my-lg-0 w-100" style={{ maxWidth: '400px' }}>
            <div className="input-group">
              <span className="input-group-text bg-transparent border-end-0">
                🔍
              </span>
              <input
                className="form-control border-start-0"
                placeholder="Search products..."
                value={q}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Icons Menu */}
          <ul className="navbar-nav ms-auto d-flex flex-row align-items-center justify-content-center gap-3">

            {/* Theme Toggle */}
            <li className="nav-item">
              <button
                onClick={toggleTheme}
                className="btn btn-link nav-link text-decoration-none fs-5"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? '🌙' : '☀️'}
              </button>
            </li>

            {/* Wishlist */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/wishlist">
                <span className="fs-5">❤️</span>
                <span className="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" style={{ fontSize: '10px' }}>
                  {wishlist.length}
                </span>
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/cart">
                <span className="fs-5">🛒</span>
                <span className="badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle" style={{ fontSize: '10px' }}>
                  {cart.length}
                </span>
              </Link>
            </li>

            {/* User Area */}
            {isAuthenticated ? (
              <>
                {/* User avatar/name pill */}
                <li className="nav-item d-flex align-items-center">
                  <Link to="/profile" className="text-decoration-none">
                    <span className="navbar-user-pill hover-scale" style={{ cursor: "pointer", transition: "transform 0.2s" }} title={user?.email || "View Profile"}>
                      {user?.avatar
                        ? <img src={user.avatar} alt={user.name} className="navbar-avatar" />
                        : <span className="navbar-avatar-fallback">{user?.name?.[0]?.toUpperCase() || "U"}</span>
                      }
                      <span className="navbar-user-name d-none d-lg-inline">{user?.name?.split(" ")[0]}</span>
                    </span>
                  </Link>
                </li>

                {/* Logout */}
                <li className="nav-item d-flex align-items-center">
                  <button
                    id="btn-logout"
                    onClick={handleLogout}
                    className="btn btn-link nav-link text-decoration-none fs-6 logout-btn d-flex align-items-center gap-1"
                    title="Logout"
                  >
                    <span>🚪</span> <span className="d-none d-lg-inline">Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li className="nav-item d-flex align-items-center">
                <button 
                  id="btn-nav-signin" 
                  className="btn btn-sm auth-nav-btn nav-link" 
                  onClick={() => setShowAuthModal(true)}
                >
                  Sign In
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
