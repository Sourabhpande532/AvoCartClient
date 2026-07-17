import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { getFallbackImage } from "../utils/fallbackImage";

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
    <div className='card h-100 fade-in border-0 shadow-sm'>
      <div 
        className="position-relative overflow-hidden" 
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/products/${product._id}`)}
      >
        <img
          src={product.images && product.images[0] ? product.images[0] : getFallbackImage(product.title)}
          alt={product.title}
          className="card-img-top transition-transform duration-300 hover-scale"
          style={{ 
            height: 260, 
            objectFit: "cover",
            background: `url('${getFallbackImage(product.title)}') center/cover no-repeat`
          }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getFallbackImage(product.title);
          }}
        />
        <div className="position-absolute top-0 end-0 p-2">
          <button 
            className="btn btn-light btn-sm rounded-circle shadow-sm"
            onClick={(e) => handleAction(e, () => addToWishlist(product._id))}
            title="Add to Wishlist"
          >
            ❤️
          </button>
        </div>
      </div>
      <div className='card-body d-flex flex-column p-3'>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6
            className='card-title mb-0 text-truncate'
            style={{ cursor: "pointer", fontWeight: '700' }}
            onClick={() => navigate(`/products/${product._id}`)}>
            {product.title}
          </h6>
          <span className="badge bg-success-subtle text-success border border-success-subtle rounded-pill">
            ★ {product.rating}
          </span>
        </div>
        <div className="d-flex align-items-center gap-2 mb-3">
          <span className="fs-5 fw-bold text-primary">₹{product.price}</span>
          {product.oldPrice && (
            <span className="text-muted text-decoration-line-through small">₹{product.oldPrice}</span>
          )}
        </div>
        <div className='mt-auto d-flex gap-2 flex-column'>
          <button
            className='btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-2'
            onClick={(e) => { e.stopPropagation(); navigate(`/products/${product._id}`); }}>
            <span>👁️</span> View Details
          </button>
          <button
            className='btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2'
            onClick={(e) => handleAction(e, () => addToCart(product._id, 1, "M"))}>
            <span>🛒</span> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default React.memo(ProductCart);
