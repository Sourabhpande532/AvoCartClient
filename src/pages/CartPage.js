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
    moveFromCartToWishlist,
    coupon,
    setCoupon,
    isCouponApplied,
    setIsCouponApplied,
    pushAlert,
  } = useAppFeatures();

  const [popup, setPopup] = useState({ show: false, message: "" });
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [seasonalOffer, setSeasonalOffer] = useState(coupon === 100 || coupon === 300);
  const [festiveOffer, setFestiveOffer] = useState(coupon === 200 || coupon === 300);

  const closePopup = () => setPopup({ show: false, message: "" });

  const filteredCart = (cart || []).filter((ci) => Boolean(ci?.product));

  const { totalMRP, totalDiscount, totalDelivery, finalAmount, totalQty } = useMemo(() => {
    const base = filteredCart.reduce(
      (acc, curr) => {
        if (!curr.product) return acc;

        const itemQty = curr.qty || 1;
        const price = (curr.product.price || 0) * itemQty;
        const discount = curr.product.discount || 0;
        const discountAmount = (price * discount) / 100;
        const delivery = curr.product.deliveryCharge || 0;

        const discountedPrice = price - discountAmount;

        acc.totalMRP += price;
        acc.totalDiscount += discountAmount;
        acc.totalDelivery += delivery;
        acc.finalAmount += discountedPrice + delivery;
        acc.totalQty += itemQty;

        return acc;
      },
      { totalMRP: 0, totalDiscount: 0, totalDelivery: 0, finalAmount: 0, totalQty: 0 }
    );

    const activeCoupon = isCouponApplied ? coupon || 0 : 0;
    base.finalAmount = Math.max(0, base.finalAmount - activeCoupon);
    return base;
  }, [filteredCart, isCouponApplied, coupon]);

  const handleApplyCoupon = () => {
    let couponValue = 0;
    if (seasonalOffer) couponValue += 100;
    if (festiveOffer) couponValue += 200;

    if (couponValue > 0) {
      setCoupon(couponValue);
      setIsCouponApplied(true);
      pushAlert({
        type: "success",
        text: `Coupon applied! You saved ₹${couponValue}`,
      });
    } else {
      setCoupon(0);
      setIsCouponApplied(false);
    }
    setShowCouponModal(false);
  };

  return (
    <div className="container py-5 fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2
          className="fw-bold mb-0 text-body"
          style={{ fontFamily: "var(--font-serif)" }}>
          My Shopping Cart
        </h2>
        <span className="badge bg-primary rounded-pill px-3 py-2">
          {filteredCart.length} {filteredCart.length === 1 ? "Item" : "Items"}
        </span>
      </div>

      {loading && (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

      {!loading && filteredCart.length === 0 && (
        <div className="card border shadow-sm rounded-4 p-5 text-center mx-auto" style={{ maxWidth: "640px" }}>
          <div className="fs-1 mb-3">🛒</div>
          <h3
            className="fw-bold mb-2 text-body"
            style={{ fontFamily: "var(--font-serif)" }}>
            Your cart is empty
          </h3>
          <p className="text-muted mb-4">
            Your shopping bag is waiting for fashionable additions! Explore our curated catalog and fill it with styles you love.
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

      {filteredCart.length > 0 && (
        <div className="row g-5">
          {/* ---------------- LEFT CART ITEMS ---------------- */}
          <div className="col-lg-8">
            <div className="d-flex flex-column gap-3">
              {filteredCart.map((ci) => {
                const unitPrice = ci?.product?.price || 0;
                const unitOriginal =
                  ci?.product?.oldPrice ||
                  unitPrice + Math.floor(unitPrice * 0.35);

                return (
                  <div
                    key={ci._id}
                    className="card border shadow-sm p-3 rounded-3">
                    {!ci.product ? (
                      <p className="text-danger mb-0">Product unavailable</p>
                    ) : (
                      <div className="row g-4 align-items-center">
                        {/* Product Image */}
                        <div className="col-12 col-sm-3">
                          <div
                            className="bg-body-secondary rounded-3 overflow-hidden"
                            style={{ height: "145px", cursor: "pointer" }}
                            onClick={() =>
                              navigate(`/products/${ci.product._id}`)
                            }>
                            <img
                              src={getProductImage(ci?.product)}
                              alt={ci.product.title}
                              className="w-100 h-100 object-fit-cover hover-scale"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = getFallbackImage(
                                  ci?.product?.title
                                );
                              }}
                            />
                          </div>
                        </div>

                        {/* Product Details */}
                        <div className="col-12 col-sm-9">
                          <div className="d-flex justify-content-between align-items-start mb-1">
                            <div>
                              <h5
                                className="fw-bold mb-1 text-body"
                                style={{
                                  fontFamily: "var(--font-serif)",
                                  fontSize: "1.05rem",
                                  cursor: "pointer",
                                }}
                                onClick={() =>
                                  navigate(`/products/${ci.product._id}`)
                                }>
                                {ci.product.title}
                              </h5>
                              <p className="text-muted small mb-0">
                                {ci.product.category?.name}
                              </p>
                            </div>
                            <button
                              type="button"
                              className="btn btn-link text-danger p-0 text-decoration-none fs-5"
                              onClick={() => removeFromCart(ci._id)}
                              title="Remove item">
                              ✕
                            </button>
                          </div>

                          <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                            <span className="fs-5 fw-extrabold text-body">
                              ₹{unitPrice * (ci.qty || 1)}
                            </span>
                            <span className="text-muted text-decoration-line-through small">
                              ₹{unitOriginal * (ci.qty || 1)}
                            </span>
                            {ci.product.discount > 0 && (
                              <span className="badge bg-success-subtle text-success border border-success-subtle small">
                                {ci.product.discount}% OFF
                              </span>
                            )}
                            {ci.size && (
                              <span className="badge bg-body-secondary text-body border small">
                                Size: {ci.size}
                              </span>
                            )}
                          </div>

                          {/* Quantity & Actions */}
                          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3">
                            <div className="d-flex align-items-center border rounded-2 bg-body-tertiary p-1">
                              <button
                                type="button"
                                className="btn btn-sm rounded-2 shadow-none px-2 py-0 border-0 fw-bold text-body"
                                disabled={ci.qty <= 1}
                                onClick={() =>
                                  updateCartQty(
                                    ci._id,
                                    Math.max(1, ci.qty - 1)
                                  )
                                }>
                                −
                              </button>
                              <span
                                className="mx-3 fw-bold small text-body"
                                style={{
                                  minWidth: "20px",
                                  textAlign: "center",
                                }}>
                                {ci.qty}
                              </span>
                              <button
                                type="button"
                                className="btn btn-sm rounded-2 shadow-none px-2 py-0 border-0 fw-bold text-body"
                                onClick={() =>
                                  updateCartQty(ci._id, ci.qty + 1)
                                }>
                                +
                              </button>
                            </div>

                            <div className="d-flex align-items-center gap-2">
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-secondary fw-semibold"
                                onClick={() => moveFromCartToWishlist(ci)}>
                                ♡ Move to Wishlist
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger fw-semibold"
                                onClick={() => removeFromCart(ci._id)}>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ---------------- RIGHT PRICE DETAILS ---------------- */}
          <div className="col-lg-4">
            <div
              className="card border shadow-sm rounded-4 p-4 sticky-top"
              style={{ top: "95px" }}>
              {/* ATTIREX Apply Coupon Button */}
              <div className="mb-4">
                <button
                  type="button"
                  className="attirex-btn-outline py-2"
                  onClick={() => setShowCouponModal(true)}>
                  <span>🏷️</span>
                  <span>
                    {isCouponApplied
                      ? `Coupon Applied (-₹${coupon})`
                      : "Apply Coupon"}
                  </span>
                </button>
              </div>

              <h5
                className="fw-bold mb-3 text-body"
                style={{ fontFamily: "var(--font-serif)" }}>
                Price Details ({filteredCart.length}{" "}
                {filteredCart.length === 1 ? "item" : "items"}, Qty: {totalQty})
              </h5>

              <div className="d-flex flex-column gap-2 mb-3">
                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted small">Total MRP</span>
                  <span className="fw-semibold small text-body">
                    ₹{totalMRP.toFixed(2)}
                  </span>
                </div>

                <div className="d-flex justify-content-between text-success py-1">
                  <span className="small">Discount on MRP</span>
                  <span className="fw-semibold small">
                    - ₹{totalDiscount.toFixed(2)}
                  </span>
                </div>

                {isCouponApplied && coupon > 0 && (
                  <div className="d-flex justify-content-between text-success py-1">
                    <span className="small">Coupon Discount</span>
                    <span className="fw-semibold small">
                      - ₹{coupon.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="d-flex justify-content-between py-1">
                  <span className="text-muted small">Delivery Charges</span>
                  <span className="fw-semibold small text-body">
                    {totalDelivery > 0 ? (
                      `₹${totalDelivery.toFixed(2)}`
                    ) : (
                      <span className="text-success fw-bold">FREE</span>
                    )}
                  </span>
                </div>
              </div>

              <hr className="my-3 opacity-25" />

              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fs-5 fw-bold text-body">Total Amount</span>
                <span className="fs-4 fw-extrabold text-body">
                  ₹{finalAmount.toFixed(2)}
                </span>
              </div>

              <button
                type="button"
                className="attirex-btn-primary py-2"
                onClick={() => navigate("/checkout")}
                disabled={filteredCart.length === 0}>
                Proceed to Checkout
              </button>

              {totalDiscount + (isCouponApplied ? coupon : 0) > 0 && (
                <div className="mt-3 p-2 bg-success-subtle text-success rounded-3 border border-success-subtle">
                  <p className="small mb-0 text-center fw-semibold py-1">
                    ✨ You save ₹
                    {(totalDiscount + (isCouponApplied ? coupon : 0)).toFixed(
                      2
                    )}{" "}
                    on this order!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ATTIREX Coupon Modal */}
      {showCouponModal && (
        <div
          className="attirex-coupon-overlay"
          onClick={() => setShowCouponModal(false)}>
          <div
            className="attirex-coupon-modal"
            onClick={(e) => e.stopPropagation()}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5
                className="fw-bold mb-0"
                style={{ fontFamily: "var(--font-serif)" }}>
                Apply Coupon
              </h5>
              <button
                type="button"
                className="btn-close shadow-none"
                onClick={() => setShowCouponModal(false)}
                aria-label="Close"
              />
            </div>

            <div
              className={`attirex-coupon-option ${seasonalOffer ? "selected" : ""}`}
              onClick={() => setSeasonalOffer(!seasonalOffer)}>
              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="coupon-seasonal"
                  checked={seasonalOffer}
                  onChange={() => setSeasonalOffer(!seasonalOffer)}
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="coupon-seasonal">
                  Seasonal Offer — Save ₹100
                </label>
              </div>
              <p className="text-muted small mb-0 ps-4">
                Get a refreshing discount of ₹100 on your order!
              </p>
            </div>

            <div
              className={`attirex-coupon-option ${festiveOffer ? "selected" : ""}`}
              onClick={() => setFestiveOffer(!festiveOffer)}>
              <div className="form-check mb-1">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="coupon-festive"
                  checked={festiveOffer}
                  onChange={() => setFestiveOffer(!festiveOffer)}
                />
                <label
                  className="form-check-label fw-bold"
                  htmlFor="coupon-festive">
                  Festive Offer — Save ₹200
                </label>
              </div>
              <p className="text-muted small mb-0 ps-4">
                Save ₹200 on orders and make your celebrations even more joyful.
              </p>
            </div>

            <button
              type="button"
              className="attirex-btn-primary mt-2"
              onClick={handleApplyCoupon}>
              Apply Selected Offers
            </button>
          </div>
        </div>
      )}

      <PopupMessage
        show={popup.show}
        message={popup.message}
        onClose={closePopup}
      />
    </div>
  );
};
