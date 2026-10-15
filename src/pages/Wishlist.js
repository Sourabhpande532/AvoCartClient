import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { getFallbackImage, getProductImage } from "../utils/fallbackImage";

export const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist, globalSearch } =
    useAppFeatures();
  const navigate = useNavigate();
  
  const filteredWishlist = (wishlist || []).filter((w) =>
    (w?.product?.title || "")
      .toLowerCase()
      .includes((globalSearch || "").toLowerCase())
  );

  return (
    <div className='container py-5 fade-in'>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className='fw-bold mb-1'>Saved Wishlist</h2>
          <p className="text-muted mb-0 small">Items you've bookmarked for later</p>
        </div>
        <span className="badge bg-primary rounded-pill px-3 py-2">{filteredWishlist.length} Items</span>
      </div>

      {!filteredWishlist.length && (
        <div className='card border shadow-sm rounded-4 p-5 text-center'>
          <div className="fs-1 mb-3 text-muted">❤️</div>
          <h3 className="fw-bold mb-2">Your wishlist is empty</h3>
          <p className="text-muted small mb-4">Explore our catalog and save your favorite products.</p>
          <div>
            <button className="btn btn-primary px-4 py-2 rounded-3 fw-semibold" onClick={() => navigate('/products')}>Browse Catalog</button>
          </div>
        </div>
      )}

      <div className='row g-4'>
        {filteredWishlist.map((w) => (
          <div key={w._id} className='col-lg-3 col-md-4 col-sm-6'>
            <div className='card h-100 border shadow-sm overflow-hidden rounded-3'>
              {/* Product Image */}
              <div 
                className="position-relative overflow-hidden bg-body-secondary" 
                style={{ height: "220px", cursor: 'pointer' }} 
                onClick={() => navigate(`/products/${w?.product?._id}`)}
              >
                <img
                  src={getProductImage(w?.product)}
                  alt='wishlist'
                  className='w-100 h-100 object-fit-cover hover-scale'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getFallbackImage(w?.product?.title || "Product");
                  }}
                />
                <button 
                  className="btn btn-light btn-sm rounded-circle shadow-sm position-absolute top-0 end-0 m-2 border-0 d-flex align-items-center justify-content-center"
                  style={{ width: '32px', height: '32px' }}
                  onClick={(e) => { e.stopPropagation(); removeFromWishlist(w._id); }}
                  title="Remove from wishlist"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className='card-body p-3 d-flex flex-column'>
                <h6
                  className='fw-bold mb-2 text-truncate text-body'
                  onClick={() => navigate(`/products/${w?.product?._id}`)}
                  style={{ cursor: "pointer", fontSize: '0.95rem' }}>
                  {w?.product?.title}
                </h6>

                <div className="d-flex align-items-center gap-2 mb-3">
                  <span className='fs-5 fw-bold text-primary'>₹{w?.product?.price}</span>
                  {w.product?.discount > 0 && (
                    <span className="badge bg-success-subtle text-success border border-success-subtle small">{w.product.discount}% OFF</span>
                  )}
                </div>

                <button
                  className='btn btn-primary btn-sm w-100 d-flex align-items-center justify-content-center gap-2 rounded-2 fw-semibold mt-auto'
                  onClick={() => addToCart(w.product._id, 1, w.size || "M")}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  Move to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
