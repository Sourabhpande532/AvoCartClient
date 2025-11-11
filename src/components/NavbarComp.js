import { NavLink, useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useState } from "react";

const Header = () => {
  const { wishlist, cart } = useAppFeatures();
  const [q, setQ] = useState( '' );
  const navigate = useNavigate();
  const onSearch = ( e ) => {
    e.preventDefault();
    navigate( `/products?search=${ encodeURIComponent( q ) }` );
  };
  return (
    <nav className=' container navbar navbar-expand-lg navbar-light bg-light shadow-sm px-4 py-2'>
      <div className='container-fluid'>
        {/* Brand */ }
        <NavLink className='navbar-brand fw-bold' to='/'>
          MyShoppingSite
        </NavLink>

        {/* Search bar */ }
        <form
          className='d-flex mx-auto'
          onSubmit={ onSearch }
          style={ { width: "40%" } }>
          <input
            type='text'
            className='form-control mx-3'
            placeholder='🔍 Search'
            value={ q }
            onChange={ ( e ) => setQ( e.target.value ) }
          />
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>

        {/* Right side items */ }
        <div className='d-flex align-items-center gap-3'>
          <button className='btn btn-outline-secondary'>Login</button>

          <NavLink to='/wishlist' className='text-decoration-none text-dark'>
            <span className='position-relative'>
              <span className='fs-5'>♥️</span>
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                { wishlist.length }
              </span>
            </span>
          </NavLink>

          <NavLink to='/cart' className='text-decoration-none text-dark'>
            <span className='position-relative'>
              <span className='fs-5'>🛒</span>
              <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary'>
                { cart.length }
              </span>
            </span>
          </NavLink>

          <NavLink className="nav-link" to="/profile">🧑‍💻Profile</NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Header;
