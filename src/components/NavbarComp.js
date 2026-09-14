import { Link, useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { wishlist, cart, globalSearch, setGlobalSearch, theme, toggleTheme } =
    useAppFeatures();
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
    <nav
      className={`navbar navbar-expand-lg sticky-top ${theme === "light" ? "navbar-light bg-light border-bottom" : "navbar-dark bg-dark"}`}>
      <div className='container'>
        {/* Brand */}
        <Link
          className='navbar-brand fs-4 fw-extrabold d-flex align-items-center gap-2'
          to='/'>
          <span className='fs-3'>🥑</span>
          <span className='fw-bold tracking-tight'>AvoCart</span>
        </Link>

        {/* Toggle Button */}
        <button
          className='navbar-toggler border-0 shadow-none'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navContent'
          aria-controls='navContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        {/* Collapsible Content */}
        <div className='collapse navbar-collapse' id='navContent'>
          {/* Search Bar */}
          <div
            className='mx-auto my-3 my-lg-0 w-100'
            style={{ maxWidth: "420px" }}>
            <div className='input-group'>
              <span className='input-group-text bg-body-tertiary border-end-0 text-muted ps-3'>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <circle cx='11' cy='11' r='8'></circle>
                  <line x1='21' y1='21' x2='16.65' y2='16.65'></line>
                </svg>
              </span>
              <input
                className='form-control bg-body-tertiary border-start-0 ps-1'
                placeholder='Search catalog...'
                value={q}
                onChange={onChange}
              />
            </div>
          </div>

          {/* Icons Menu */}
          <ul className='navbar-nav ms-auto d-flex flex-row align-items-center justify-content-center gap-3'>
            {/* Theme Toggle */}
            <li className='nav-item'>
              <button
                onClick={toggleTheme}
                className='btn btn-link nav-link text-decoration-none p-2 rounded-circle'
                title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}>
                {theme === "light" ? "🌙" : "☀️"}
              </button>
            </li>

            {/* Wishlist */}
            <li className='nav-item'>
              <Link
                className='nav-link position-relative p-2'
                to='/wishlist'
                title='Wishlist'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <path d='M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'></path>
                </svg>
                {wishlist.length > 0 && (
                  <span
                    className='badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle'
                    style={{ fontSize: "10px" }}>
                    {wishlist.length}
                  </span>
                )}
              </Link>
            </li>

            {/* Cart */}
            <li className='nav-item'>
              <Link
                className='nav-link position-relative p-2'
                to='/cart'
                title='Shopping Cart'>
                <svg
                  width='20'
                  height='20'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'>
                  <circle cx='9' cy='21' r='1'></circle>
                  <circle cx='20' cy='21' r='1'></circle>
                  <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'></path>
                </svg>
                {cart.length > 0 && (
                  <span
                    className='badge rounded-pill bg-primary position-absolute top-0 start-100 translate-middle'
                    style={{ fontSize: "10px" }}>
                    {cart.length}
                  </span>
                )}
              </Link>
            </li>

            {/* User Area */}
            {isAuthenticated ? (
              <>
                {/* User avatar/name pill */}
                <li className='nav-item d-flex align-items-center ms-2'>
                  <Link to='/profile' className='text-decoration-none'>
                    <span
                      className='navbar-user-pill'
                      title={user?.email || "View Profile"}>
                      {user?.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className='navbar-avatar'
                        />
                      ) : (
                        <span className='navbar-avatar-fallback'>
                          {user?.name?.[0]?.toUpperCase() || "U"}
                        </span>
                      )}
                      <span className='navbar-user-name d-none d-lg-inline'>
                        {user?.name?.split(" ")[0]}
                      </span>
                    </span>
                  </Link>
                </li>

                {/* Logout */}
                <li className='nav-item d-flex align-items-center'>
                  <button
                    id='btn-logout'
                    onClick={handleLogout}
                    className='btn btn-link text-body text-decoration-none fs-6 logout-btn d-flex align-items-center gap-1 p-2'
                    title='Logout'>
                    <svg
                      width='16'
                      height='16'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'>
                      <path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'></path>
                      <polyline points='16 17 21 12 16 7'></polyline>
                      <line x1='21' y1='12' x2='9' y2='12'></line>
                    </svg>
                    <span className='d-none d-lg-inline'>Lgout</span>
                  </button>
                </li>
              </>
            ) : (
              <li className='nav-item d-flex align-items-center ms-2'>
                <button
                  id='btn-nav-signin'
                  className={`btn btn-sm ${theme === "light" ? "btn-outline-dark" : "btn-outline-light"}`}
                  onClick={() => setShowAuthModal(true)}>
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
