import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { getFallbackImage } from "../utils/fallbackImage";

/* eslint-disable jsx-a11y/alt-text */
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
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className='fw-bold mb-1'>My Wishlist ❤️</h2>
          <p className="text-muted mb-0">Saved items you might want to buy later</p>
        </div>
        <span className="badge bg-primary rounded-pill px-3 py-2">{filteredWishlist.length} Items</span>
      </div>

      {!filteredWishlist.length && (
        <div className='card border-0 shadow-sm rounded-4 p-5 text-center'>
          <div className="fs-1 mb-3">❤️</div>
          <h3 className="fw-bold">Your wishlist is empty</h3>
          <p className="text-muted">Save items you love to your wishlist to find them easily later.</p>
          <button className="btn btn-primary px-4 py-2 mt-3" onClick={() => navigate('/products')}>Browse Products</button>
        </div>
      )}

      <div className='row g-4'>
        {filteredWishlist.map((w) => (
            <div key={w._id} className='col-lg-3 col-md-4 col-sm-6'>
              <div className='card h-100 border-0 shadow-sm overflow-hidden'>
                {/* Product Image */}
                <div className="position-relative overflow-hidden" style={{ height: "240px", cursor: 'pointer' }} onClick={() => navigate(`/products/${w?.product?._id}`)}>
                  <img
                    src={w?.product?.images && w?.product?.images[0] ? w.product.images[0] : getFallbackImage(w?.product?.title || "Product")}
                    alt='wishlist'
                    className='w-100 h-100 object-fit-cover hover-scale'
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getFallbackImage(w?.product?.title || "Product");
                    }}
                  />
                  <button 
                    className="btn btn-light btn-sm rounded-circle shadow-sm position-absolute top-0 end-0 m-2"
                    onClick={(e) => { e.stopPropagation(); removeFromWishlist(w._id); }}
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>

                {/* Content */}
                <div className='card-body p-3 d-flex flex-column'>
                  <h6
                    className='fw-bold mb-2 text-truncate'
                    onClick={() => navigate(`/products/${w?.product?._id}`)}
                    style={{ cursor: "pointer" }}>
                    {w?.product?.title}
                  </h6>

                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className='fs-5 fw-bold text-primary'>₹ {w?.product?.price}</span>
                    {w.product?.discount > 0 && (
                      <span className="small text-success fw-semibold">{w.product.discount}% OFF</span>
                    )}
                  </div>

                  <button
                    className='btn btn-primary w-100 d-flex align-items-center justify-content-center gap-2'
                    onClick={() => addToCart(w.product._id, 1, w.size || "M")}>
                    <span>🛒</span> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
