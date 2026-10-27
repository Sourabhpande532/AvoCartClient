import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { getFallbackImage, getProductImage } from "../utils/fallbackImage";

export const Wishlist = () => {
  const {
    wishlist,
    removeFromWishlist,
    moveFromWishlistToCart,
  } = useAppFeatures();
  const navigate = useNavigate();

  const filteredWishlist = (wishlist || []).filter((w) => Boolean(w?.product));

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2
            className="fw-bold mb-1 text-body"
            style={{ fontFamily: "var(--font-serif)" }}>
            My Wishlist
          </h2>
          <p className="text-muted mb-0 small">
            Curated favorites saved for your wardrobe
          </p>
        </div>
        <span className="badge bg-primary rounded-pill px-3 py-2">
          {filteredWishlist.length}{" "}
          {filteredWishlist.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {!filteredWishlist.length && (
        <div
          className="card border shadow-sm rounded-4 p-5 text-center mx-auto"
          style={{ maxWidth: "640px" }}>
          <div className="fs-1 mb-3">❤️</div>
          <h3
            className="fw-bold mb-2 text-body"
            style={{ fontFamily: "var(--font-serif)" }}>
            Your wishlist is empty
          </h3>
          <p className="text-muted mb-4">
            Save your favorite outfits and gadgets here so you can easily move them to your shopping bag anytime.
          </p>
          <div>
            <button
              type="button"
              className="attirex-btn-primary mx-auto"
              style={{ maxWidth: "240px" }}
              onClick={() => navigate("/products")}>
              Explore Products
            </button>
          </div>
        </div>
      )}

      <div className="row g-4">
        {filteredWishlist.map((w) => {
          const price = w?.product?.price || 0;
          const originalPrice =
            w?.product?.oldPrice || price + Math.floor(price * 0.35);

          return (
            <div key={w._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
              <div
                className="attirex-product-card"
                onClick={() => navigate(`/products/${w?.product?._id}`)}>
                {/* Product Image */}
                <div className="attirex-card-img-wrap" style={{ height: "230px" }}>
                  <img
                    src={getProductImage(w?.product)}
                    alt={w?.product?.title || "Wishlist Item"}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getFallbackImage(
                        w?.product?.title || "Product"
                      );
                    }}
                  />
                  <button
                    type="button"
                    className="attirex-wishlist-heart"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromWishlist(w._id);
                    }}
                    title="Remove from wishlist"
                    aria-label="Remove from wishlist">
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className="attirex-card-info">
                  <div className="attirex-card-header">
                    <h6 className="attirex-card-title">
                      {w?.product?.title}
                    </h6>
                    {w?.product?.rating && (
                      <span className="attirex-star-pill rating-badge">
                        <span>{w.product.rating}</span>
                        <span className="star-symbol">★</span>
                      </span>
                    )}
                  </div>

                  <p className="attirex-card-desc">
                    {w?.product?.description || "Premium quality item"}
                  </p>

                  <div className="attirex-card-price-row">
                    <span className="attirex-price-current">₹{price}</span>
                    <span className="attirex-price-original">
                      ₹{originalPrice}
                    </span>
                    {w.product?.discount > 0 && (
                      <span className="attirex-price-discount">
                        ({w.product.discount}% OFF)
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    className="attirex-btn-primary mt-auto"
                    onClick={(e) => {
                      e.stopPropagation();
                      moveFromWishlistToCart(w);
                    }}>
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>Move to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
