import { Link } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState } from "react";

const Header = () => {
  const { wishlist, cart, globalSearch, setGlobalSearch } = useAppFeatures();
  // update setGlobalSearch search on each keyword
  const [q, setQ] = useState(globalSearch || "");

  useEffect(() => setQ(globalSearch || ""), [globalSearch]);

  const onChange = (e) => {
    const value = e.target.value;
    setQ(value);
    setGlobalSearch(value); //Live update
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <div className='container'>
        {/* Brand */}
        <Link className='navbar-brand' to='/'>
          MyShoppingSite
        </Link>

        {/* Toggle Button for Mobile */}
        <button
          className='navbar-toggler'
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
          {/* Live search input _ no button */}
          <input
            className='form-control ms-auto me-3 w-50'
            placeholder='Search Products...'
            value={q}
            onChange={onChange}
          />
          {/* Menu Items */}
          <ul className='navbar-nav ms-lg-3 mt-3 mt-lg-0'>
            <li className='nav-item'>
              <Link className='nav-link text-dark' to='/wishlist'>
                <span className='position-relative'>
                  <span className='fs-5'>♥️</span>
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                    {wishlist.length}
                  </span>
                </span>
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link text-dark' to='/cart'>
                <span className='position-relative'>
                  <span className='fs-5'>🛒</span>
                  <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>
                    {cart.length}
                  </span>
                </span>
              </Link>
            </li>

            <li className='nav-item'>
              <Link className='nav-link text-dark' to='/profile'>
                🧑Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
