import { useState } from "react";
import PopupMessage from "../components/PopupMessage";
import { useAppFeatures } from "../contexts/AppContext";
import { Checkout } from "./Checkout";
import { getFallbackImage } from "../utils/fallbackImage";

export const CartPage = () => {
  const {
    cart,
    loading,
    updateCartQty,
    removeFromCart,
    addToWishlist,
    globalSearch,
  } = useAppFeatures();

  const [popup, setPopup] = useState({ show: false, message: "" });

  const showPopup = (msg) => setPopup({ show: true, message: msg });
  const closePopup = () => setPopup({ show: false, message: "" });

  // 🔍 Apply global search
  const filteredCart = (cart || []).filter((ci) =>
    (ci?.product?.title || "")
      .toLowerCase()
      .includes((globalSearch || "").toLowerCase())
  );

  // 💰 Totals calculation
  const { totalMRP, totalDiscount, totalDelivery, finalAmount } =
    filteredCart.reduce(
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
            <div className='card border-0 shadow-sm rounded-4 p-5 text-center'>
              <div className="fs-1 mb-3">🛒</div>
              <h3 className="fw-bold">Your cart is empty</h3>
              <p className="text-muted">Looks like you haven't added anything to your cart yet.</p>
              <button className="btn btn-primary px-4 py-2 mt-3" onClick={() => window.location.href = '/products'}>Start Shopping</button>
            </div>
          )}

          <div className="d-flex flex-column gap-3">
            {filteredCart.map((ci) => (
              <div
                key={ci._id}
                className='card border-0 shadow-sm p-3 rounded-4 transition-all hover-shadow'>
                {!ci.product ? (
                  <p className='text-danger'>Product unavailable</p>
                ) : (
                  <div className='row g-4 align-items-center'>
                    {/* Product Image */}
                    <div className='col-12 col-sm-3'>
                      <div className="bg-body-secondary rounded-3 p-2 text-center overflow-hidden" style={{ height: '140px' }}>
                        <img
                          src={ci?.product?.images && ci?.product?.images[0] ? ci.product.images[0] : getFallbackImage(ci.product.title)}
                          alt='cart-img'
                          className='img-fluid h-100 w-100 object-fit-contain hover-scale'
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getFallbackImage(ci.product.title);
                          }}
                        />
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className='col-12 col-sm-9'>
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div>
                          <h5 className='fw-bold mb-1'>{ci.product.title}</h5>
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
                        <span className="fs-5 fw-bold text-primary">₹{ci.product.price}</span>
                        {ci.product.discount > 0 && (
                          <span className='badge bg-success-subtle text-success border border-success-subtle'>
                            {ci.product.discount}% OFF
                          </span>
                        )}
                        {ci.size && (
                          <span className='badge bg-body-secondary text-body border'>
                            Size: {ci.size}
                          </span>
                        )}
                      </div>

                      {/* ACTIONS */}
                      <div className='d-flex flex-wrap align-items-center justify-content-between gap-3'>
                        <div className='d-flex align-items-center border rounded-pill p-1 bg-body-tertiary'>
                          <button
                            className='btn btn-sm btn-body-tertiary rounded-circle shadow-none px-3 border-0'
                            onClick={() => updateCartQty(ci._id, Math.max(1, ci.qty - 1))}
                          >
                            −
                          </button>
                          <span className='mx-3 fw-bold' style={{ minWidth: '20px', textAlign: 'center' }}>{ci.qty}</span>
                          <button
                            className='btn btn-sm btn-body-tertiary rounded-circle shadow-none px-3 border-0'
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
          <div className='card border-0 shadow-lg rounded-4 p-4 sticky-top' style={{ top: '100px' }}>
            <h5 className='fw-bold mb-4'>Order Summary</h5>

            <div className="d-flex flex-column gap-3 mb-4">
              <div className='d-flex justify-content-between'>
                <span className="text-muted">Subtotal</span>
                <span className="fw-semibold">₹ {totalMRP.toFixed(2)}</span>
              </div>

              <div className='d-flex justify-content-between text-success'>
                <span>Discount</span>
                <span className="fw-semibold">- ₹ {totalDiscount.toFixed(2)}</span>
              </div>

              <div className='d-flex justify-content-between'>
                <span className="text-muted">Delivery</span>
                <span className="fw-semibold">
                  {totalDelivery > 0 ? `₹ ${totalDelivery.toFixed(2)}` : <span className="text-success">FREE</span>}
                </span>
              </div>
            </div>

            <hr className="my-4 opacity-50" />

            <div className='d-flex justify-content-between align-items-center mb-4'>
              <span className='fs-5 fw-bold'>Total</span>
              <span className='fs-4 fw-bold text-primary'>₹ {finalAmount.toFixed(2)}</span>
            </div>

            <div className='d-grid'>
              <Checkout showPopup={showPopup} />
            </div>

            <div className="mt-4 p-3 bg-primary-subtle rounded-3">
              <p className="small mb-0 text-primary fw-semibold text-center">
                ✨ You are saving ₹{totalDiscount.toFixed(2)} on this order!
              </p>
            </div>

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
