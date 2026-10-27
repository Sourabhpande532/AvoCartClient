import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import { getFallbackImage, getProductImage } from "../utils/fallbackImage";

const ProductCart = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, addToWishlist, removeFromWishlist, wishlist, cart } =
    useAppFeatures();
  const { isAuthenticated, setShowAuthModal } = useAuth();

  const wishlistEntry =
    isAuthenticated &&
    (wishlist || []).find(
      (w) => w?.product?._id === product._id || w?._id === product._id
    );
  const isFavorite = Boolean(wishlistEntry);

  const isAddedToCart =
    isAuthenticated &&
    (cart || []).some((c) => c?.product?._id === product._id);

  const originalPrice =
    product.oldPrice || product.price + Math.floor(product.price * 0.35);

  const handleAction = (e, actionCallback) => {
    e.stopPropagation();
    if (isAuthenticated) {
      actionCallback();
    } else {
      setShowAuthModal(true);
    }
  };

  const handleWishlistToggle = (e) => {
    handleAction(e, () => {
      if (isFavorite && wishlistEntry?._id) {
        removeFromWishlist(wishlistEntry._id);
      } else {
        addToWishlist(product._id);
      }
    });
  };

  return (
    <div
      className="attirex-product-card fade-in"
      onClick={() => navigate(`/products/${product._id}`)}
    >
      <div className="attirex-card-img-wrap">
        <img
          src={getProductImage(product)}
          alt={product.title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = getFallbackImage(product.title);
          }}
        />

        {product.rating >= 4.4 && (
          <span className="attirex-card-badge">Trending</span>
        )}

        <button
          type="button"
          className="attirex-wishlist-heart"
          onClick={handleWishlistToggle}
          title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
          aria-label={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFavorite ? "#ef4444" : "none"}
            stroke={isFavorite ? "#ef4444" : "#121932"}
            strokeWidth="2.1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="attirex-card-info">
        <div className="attirex-card-header">
          <h3 className="attirex-card-title" title={product.title}>
            {product.title}
          </h3>
          <span className="attirex-star-pill rating-badge">
            <span>{product.rating}</span>
            <span className="star-symbol">★</span>
          </span>
        </div>

        <p className="attirex-card-desc">
          {product.description || `Premium ${product.title}`}
        </p>

        <div className="attirex-card-price-row">
          <span className="attirex-price-current">₹{product.price}</span>
          <span className="attirex-price-original">₹{originalPrice}</span>
        </div>

        <div className="mt-auto">
          {isAddedToCart ? (
            <button
              type="button"
              className="attirex-btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/cart");
              }}
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Go To Cart</span>
            </button>
          ) : (
            <button
              type="button"
              className="attirex-btn-primary"
              onClick={(e) =>
                handleAction(e, () => addToCart(product._id, 1, "M"))
              }
            >
              <svg
                width="17"
                height="17"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Add To Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCart);
