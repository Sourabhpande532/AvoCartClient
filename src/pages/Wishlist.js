/* eslint-disable react/jsx-no-comment-textnodes */

import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";

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
    <div className='container py-3'>
      <h3 className='mb-4 fw-bold'>❤️ My Wishlist</h3>

      {filteredWishlist.length === 0 && (
        <p className='text-muted'>Your Wishlist is empty</p>
      )}

      <div className='row g-4'>
        {Array.isArray(filteredWishlist) &&
          filteredWishlist.length > 0 &&
          filteredWishlist.map((w) => (
            <div key={w._id} className='col-md-4 col-sm-6'>
              <div
                className='card h-100 shadow-sm border-0 wishlist-card'
                style={{ borderRadius: "14px", overflow: "hidden" }}>
                {/* Product Image */}
                <div className='wishlist-img-wrapper'>
                  <img
                    src={
                      w?.product?.images?.[0] ||
                      "https://picsum.photos/id/2/209/300"
                    }
                    className='card-img-top'
                    style={{
                      height: 200,
                      width: "100%",
                      objectFit: "cover",
                    }}
                    alt='wishlist'
                    onClick={() => navigate(`/products/${w?.product?._id}`)}
                  />
                </div>

                {/* Content */}
                <div className='card-body d-flex flex-column'>
                  <h6
                    className='fw-semibold mb-2 wishlist-title'
                    onClick={() => navigate(`/products/${w?.product?._id}`)}
                    style={{ cursor: "pointer" }}>
                    {w?.product?.title}
                  </h6>

                  <p className='mb-3 text-primary fw-bold'>
                    ₹ {w?.product?.price}
                  </p>

                  <div className='mt-auto d-flex gap-2'>
                    <button
                      className='btn btn-success btn-sm w-100'
                      onClick={() => addToCart(w.product._id, 1, w.size || "M")}
                      style={{ borderRadius: "8px" }}>
                      🛒 Add to Cart
                    </button>
                    <button
                      className='btn btn-outline-danger btn-sm w-100'
                      onClick={() => removeFromWishlist(w._id)}
                      style={{ borderRadius: "8px" }}>
                      ❌ Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
