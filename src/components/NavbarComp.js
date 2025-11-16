import { Link } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { wishlist, cart, globalSearch, setGlobalSearch } = useAppFeatures();
  // On each key update globalSearch 
  const [q, setQ] = useState(globalSearch || "");

  useEffect(() => setQ(globalSearch || ""), [globalSearch]);

  const onChange = (e) => {
    const value = e.target.value;
    setQ(value);
    setGlobalSearch(value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">

        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          MyShoppingSite
        </Link>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
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
          <div className="w-100 my-3 my-lg-0 ms-lg-auto me-lg-3">
            <input
              className="form-control w-100"
              placeholder="Search products..."
              value={q}
              onChange={onChange}
            />
          </div>

          {/* Icons Menu */}
          <ul className="navbar-nav ms-lg-3 d-flex flex-row justify-content-center gap-4">

            {/* Wishlist */}
            <li className="nav-item">
              <Link className="nav-link text-dark position-relative" to="/wishlist">
                <span className="fs-5">❤️</span>
                <span className="badge bg-danger position-absolute start-100 translate-middle">
                  {wishlist.length}
                </span>
              </Link>
            </li>

            {/* Cart */}
            <li className="nav-item">
              <Link className="nav-link text-dark position-relative" to="/cart">
                <span className="fs-5">🛒</span>
                <span className="badge bg-primary position-absolute start-100 translate-middle">
                  {cart.length}
                </span>
              </Link>
            </li>

            {/* Profile */}
            <li className="nav-item">
              <Link className="nav-link text-dark" to="/profile">
                👤
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
