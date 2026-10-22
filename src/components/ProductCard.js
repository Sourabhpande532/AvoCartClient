import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { getFallbackImage, getProductImage } from "../utils/fallbackImage";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useAppFeatures();
  const { isAuthenticated, setShowAuthModal } = useAuth();

  const handleAction = (e, actionCallback) => {
    e.stopPropagation();
    if (isAuthenticated) {
      actionCallback();
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <div className='card h-100 fade-in border shadow-sm rounded-3 overflow-hidden'>
      <div 
        className="position-relative overflow-hidden bg-body-secondary" 
        style={{ cursor: 'pointer', height: '240px' }}
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={getProductImage(product)}
          alt={product.title}
          className="w-100 h-100 object-fit-cover hover-scale"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getFallbackImage(product.title);
          }}
        />
        <div className="position-absolute top-0 end-0 p-2">
          <button 
            className="btn btn-light btn-sm rounded-circle shadow-sm border-0 d-flex align-items-center justify-content-center"
            style={{ width: '34px', height: '34px' }}
            onClick={(e) => handleAction(e, () => addToWishlist(product._id))}
            title="Add to Wishlist"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        {product.discount > 0 && (
          <div className="position-absolute top-0 start-0 m-2">
            <span className="badge bg-danger text-white rounded-pill px-2 py-1 small">
              {product.discount}% OFF
            </span>
          </div>
        )}
      </div>
      <div className='card-body d-flex flex-column p-3'>
        <div className="d-flex justify-content-between align-items-start mb-2 gap-2">
          <h6
            className='card-title mb-0 text-truncate fw-bold text-body'
            style={{ cursor: "pointer", fontSize: '0.95rem' }}
            onClick={() => navigate(`/products/${product._id}`)}>
            {product.title}
          </h6>
          <span className="badge rating-badge rounded-pill px-2 py-1">
            ★ {product.rating}
          </span>
        </div>
        <div className="d-flex align-items-baseline gap-2 mb-3">
          <span className="fs-5 fw-extrabold text-primary">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-muted text-decoration-line-through small">₹{product.oldPrice}</span>
          )}
        </div>
        <div className='mt-auto d-flex gap-2 flex-column'>
          <button
            className='btn btn-outline-secondary btn-sm w-100 d-flex align-items-center justify-content-center gap-2 rounded-2 fw-medium'
            onClick={(e) => { e.stopPropagation(); navigate(`/products/${product._id}`); }}>
            View Details
          </button>
          <button
            className='btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2 rounded-2 fw-semibold'
            onClick={(e) => handleAction(e, () => addToCart(product._id, 1, "M"))}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCart);
