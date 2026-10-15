import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import PopupMessage from "../components/PopupMessage";
import { useAppFeatures } from "../contexts/AppContext";
import { getFallbackImage, getProductImage } from "../utils/fallbackImage";

export const CartPage = () => {
  const navigate = useNavigate();
  const {
    cart,
    loading,
    updateCartQty,
    removeFromCart,
    addToWishlist,
    globalSearch,
  } = useAppFeatures();

  const [popup, setPopup] = useState({ show: false, message: "" });
  const closePopup = () => setPopup({ show: false, message: "" });

  const filteredCart = (cart || []).filter((ci) =>
    (ci?.product?.title || "")
      .toLowerCase()
      .includes((globalSearch || "").toLowerCase())
  );

  const { totalMRP, totalDiscount, totalDelivery, finalAmount } = useMemo(() => {
    return filteredCart.reduce(
      (acc, curr) => {
        if (!curr.product) return acc;

        const price = (curr.product.price || 0) * curr.qty;
        const discount = curr.product.discount || 0;
        const discountAmount = (price * discount) / 100;
        const delivery = curr.product.deliveryCharge || 0;

        const discountedPrice = price - discountAmount;

        acc.totalMRP += price;
        acc.totalDiscount += discountAmount;
        acc.totalDelivery += delivery;
        acc.finalAmount += discountedPrice + delivery;

        return acc;
      },
      { totalMRP: 0, totalDiscount: 0, totalDelivery: 0, finalAmount: 0 }
    );
  }, [filteredCart]);

  return (
    <div className='container py-5 fade-in'>
      <div className='row g-5'>
        {/* ---------------- LEFT CART ITEMS ---------------- */}
        <div className='col-lg-8'>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className='fw-bold mb-0'>Shopping Cart</h2>
            <span className="badge bg-primary rounded-pill px-3 py-2">{filteredCart.length} Items</span>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          
          {!loading && filteredCart.length === 0 && (
            <div className='card border shadow-sm rounded-4 p-5 text-center'>
              <div className="fs-1 mb-3 text-muted">🛒</div>
              <h3 className="fw-bold mb-2">Your cart is empty</h3>
              <p className="text-muted small mb-4">Explore our catalog and find something you love.</p>
              <div>
                <button className="btn btn-primary px-4 py-2 rounded-3 fw-semibold" onClick={() => navigate('/products')}>Start Shopping</button>
              </div>
            </div>
          )}

          <div className="d-flex flex-column gap-3">
            {filteredCart.map((ci) => (
              <div
                key={ci._id}
                className='card border shadow-sm p-3 rounded-3'>
                {!ci.product ? (
                  <p className='text-danger mb-0'>Product unavailable</p>
                ) : (
                  <div className='row g-4 align-items-center'>
                    {/* Product Image */}
                    <div className='col-12 col-sm-3'>
                      <div className="bg-body-secondary rounded-3 p-2 text-center overflow-hidden" style={{ height: '130px' }}>
                        <img
                          src={getProductImage(ci?.product)}
                          alt='cart-img'
                          className='img-fluid h-100 w-100 object-fit-contain hover-scale'
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getFallbackImage(ci?.product?.title);
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className='col-12 col-sm-9'>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h6 className='fw-bold mb-1 text-body' style={{ fontSize: '1rem' }}>{ci.product.title}</h6>
                          <p className="text-muted small mb-0">{ci.product.category?.name}</p>
                        </div>
                        <button
                          className='btn btn-link text-danger p-0 text-decoration-none fs-5'
                          onClick={() => removeFromCart(ci._id)}
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>

                      <div className="d-flex align-items-center gap-3 mb-3">
                        <span className="fs-5 fw-bold text-primary">₹{(ci.product.price || 0) * (ci.qty || 1)}</span>
                        {ci.product.discount > 0 && (
                          <span className='badge bg-success-subtle text-success border border-success-subtle small'>
                            {ci.product.discount}% OFF
                          </span>
                        )}
                        {ci.size && (
                          <span className='badge bg-body-secondary text-body border small'>
                            Size: {ci.size}
                          </span>
                        )}
                      </div>

                      {/* ACTIONS */}
                      <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                        <div className='d-flex align-items-center border rounded-2 bg-body-tertiary p-1'>
                          <button
                            className='btn btn-sm btn-body-tertiary rounded-circle shadow-none px-2 py-0 border-0 fw-bold'
                            onClick={() => updateCartQty(ci._id, Math.max(1, ci.qty - 1))}
                          >
                            −
                          </button>
                          <span className='mx-3 fw-bold small' style={{ minWidth: '20px', textAlign: 'center' }}>{ci.qty}</span>
                          <button
                            className='btn btn-sm btn-body-tertiary rounded-circle shadow-none px-2 py-0 border-0 fw-bold'
                            onClick={() => updateCartQty(ci._id, ci.qty + 1)}
                          >
                            +
                          </button>
                        </div>

                        <button
                          className='btn btn-sm btn-link text-primary text-decoration-none fw-semibold p-0'
                          onClick={() => addToWishlist(ci.product._id)}>
                          ❤️ Save to Wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ---------------- RIGHT PRICE DETAILS ---------------- */}
        <div className='col-lg-4'>
          <div className='card border shadow-sm rounded-4 p-4 sticky-top' style={{ top: '100px' }}>
            <h5 className='fw-bold mb-4 text-body'>Order Summary</h5>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className='d-flex justify-content-between'>
                <span className="text-muted small">Subtotal</span>
                <span className="fw-semibold small">₹ {totalMRP.toFixed(2)}</span>
              </div>

              <div className='d-flex justify-content-between text-success'>
                <span className="small">Discount</span>
                <span className="fw-semibold small">- ₹ {totalDiscount.toFixed(2)}</span>
              </div>

              <div className='d-flex justify-content-between'>
                <span className="text-muted small">Shipping</span>
                <span className="fw-semibold small">
                  {totalDelivery > 0 ? `₹ ${totalDelivery.toFixed(2)}` : <span className="text-success fw-bold">FREE</span>}
                </span>
              </div>
            </div>

            <hr className="my-4 opacity-25" />

            <div className='d-flex justify-content-between align-items-center mb-4'>
              <span className='fs-5 fw-bold text-body'>Total</span>
              <span className='fs-4 fw-extrabold text-primary'>₹ {finalAmount.toFixed(2)}</span>
            </div>

            <div className='d-grid'>
              <button 
                className="btn btn-primary w-100 py-2.5 rounded-3 fw-semibold shadow-sm" 
                onClick={() => navigate('/checkout')}
                disabled={filteredCart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>

            {totalDiscount > 0 && (
              <div className="mt-4 p-3 bg-success-subtle text-success rounded-3 border border-success-subtle">
                <p className="small mb-0 text-center fw-medium">
                  ✨ You saved ₹{totalDiscount.toFixed(2)} on this order!
                </p>
              </div>
            )}

            <PopupMessage
              show={popup.show}
              message={popup.message}
              onClose={closePopup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
