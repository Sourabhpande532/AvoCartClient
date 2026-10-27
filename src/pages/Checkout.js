import { useNavigate, Link } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState, useMemo, useRef } from "react";
import PopupMessage from "../components/PopupMessage";

export const Checkout = () => {
  const { cart, addresses, placeOrders, coupon, isCouponApplied } = useAppFeatures();
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const redirectTimerRef = useRef(null);

  const showPopup = (msg) => setPopup({ show: true, message: msg });
  const closePopup = () => setPopup({ show: false, message: "" });

  const mockAddress = useMemo(
    () => ({
      _id: "mock_address_default",
      name: "John Doe (Default)",
      phone: "9876543210",
      street: "123 Default Street",
      city: "Metropolis",
      state: "NY",
      zip: "100001",
    }),
    []
  );

  const displayAddresses = useMemo(
    () => (addresses && addresses.length > 0 ? addresses : [mockAddress]),
    [addresses, mockAddress]
  );

  const [selectedAddressId, setSelectedAddressId] = useState(
    displayAddresses[0]?._id
  );
  const navigate = useNavigate();

  useEffect(() => {
    const hasSelected = displayAddresses.some(
      (a) => a._id === selectedAddressId
    );
    if (displayAddresses.length > 0 && !hasSelected) {
      setSelectedAddressId(displayAddresses[0]._id);
    }
  }, [displayAddresses, selectedAddressId]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const { finalTotal, totalMRP, totalDiscount, totalDelivery, couponDiscount } =
    useMemo(() => {
      const summary = cart.reduce(
        (acc, item) => {
          if (!item?.product) return acc;

          const { price = 0, discount = 0, deliveryCharge = 0 } = item.product;
          const qty = item.qty || 1;

          const itemTotal = price * qty;
          const discountAmount = (itemTotal * discount) / 100;

          acc.totalMRP += itemTotal;
          acc.totalDiscount += discountAmount;
          acc.totalDelivery += deliveryCharge;
          acc.finalTotal += itemTotal - discountAmount + deliveryCharge;

          return acc;
        },
        { finalTotal: 0, totalMRP: 0, totalDiscount: 0, totalDelivery: 0 }
      );

      const appliedCoupon =
        isCouponApplied && Number(coupon) > 0 ? Number(coupon) : 0;
      summary.couponDiscount = appliedCoupon;
      summary.finalTotal = Math.max(0, summary.finalTotal - appliedCoupon);
      return summary;
    }, [cart, coupon, isCouponApplied]);

  const selectedAddress =
    displayAddresses.find((a) => a._id === selectedAddressId) ||
    displayAddresses[0];

  const doCheckout = async () => {
    if (!selectedAddress) return showPopup("Please select an address");
    if (cart.length === 0) return showPopup("Cart is empty");

    const order = await placeOrders({
      items: cart.map((ci) => ({ product: ci.product._id, qty: ci.qty })),
      total: Math.round(finalTotal),
      address: selectedAddress,
    });

    if (order) {
      setOrderPlaced(true);
      redirectTimerRef.current = setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container py-5 text-center fade-in">
        <div
          className="attirex-card p-5 mx-auto"
          style={{ maxWidth: "560px" }}
        >
          <div className="fs-1 text-success mb-3">✅</div>
          <h2
            className="fw-bold mb-2"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Order Placed Successfully.
          </h2>
          <p className="text-muted small mb-4">
            Thank you for shopping with AvoCart. Your order has been confirmed
            and is being prepared for dispatch. Redirecting to your order
            history...
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link
              to="/profile"
              className="btn attirex-btn-primary px-4 py-2 rounded-2 fw-bold"
            >
              View Order History
            </Link>
            <Link
              to="/products"
              className="btn attirex-btn-outline px-4 py-2 rounded-2 fw-bold"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      <h2 className="attirex-section-title mb-4">CHECKOUT</h2>

      <div className="row g-4">
        {/* LEFT COLUMN: Delivery Address Selection */}
        <div className="col-lg-7">
          <div className="attirex-card p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3 pb-2 border-bottom">
              <h5 className="fw-bold mb-0 text-uppercase small tracking-wider">
                Select Delivery Address
              </h5>
              <Link
                to="/profile"
                className="btn btn-sm attirex-btn-outline rounded-1 fw-bold"
              >
                + Add / Manage Address
              </Link>
            </div>

            <div className="d-flex flex-column gap-3">
              {displayAddresses.map((a) => {
                const isSelected = selectedAddressId === a._id;
                return (
                  <div
                    key={a._id}
                    className={`p-3 rounded-2 border transition-all ${
                      isSelected ? "border-primary shadow-sm" : ""
                    }`}
                    onClick={() => setSelectedAddressId(a._id)}
                    style={{
                      cursor: "pointer",
                      background: isSelected
                        ? "rgba(78, 95, 134, 0.08)"
                        : "var(--bg-surface)",
                    }}
                  >
                    <div className="d-flex align-items-start gap-3">
                      <div className="mt-1">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="addressSelection"
                          checked={isSelected}
                          onChange={() => setSelectedAddressId(a._id)}
                        />
                      </div>
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <span className="fw-bold">{a.name}</span>
                          <span className="badge bg-secondary-subtle text-secondary-emphasis small">
                            Delivery Address
                          </span>
                        </div>
                        <p className="mb-1 text-muted small">
                          {a.street}, {a.city}, {a.state} - {a.zip}
                        </p>
                        <p className="mb-0 text-muted small">
                          <strong>Phone:</strong> {a.phone}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary (Order Details + Price Details + Deliver To) */}
        <div className="col-lg-5">
          <div
            className="attirex-card p-4 sticky-top"
            style={{ top: "95px" }}
          >
            {/* ORDER DETAILS */}
            <h6 className="fw-bold text-center text-uppercase tracking-wider pb-2 mb-3 border-bottom">
              Order Details
            </h6>
            <div className="d-flex justify-content-between fw-bold small text-muted mb-2">
              <span>Item</span>
              <span>Qty</span>
            </div>
            <div className="d-flex flex-column gap-2 mb-4">
              {cart.map((item) => (
                <div
                  key={item._id}
                  className="d-flex justify-content-between align-items-center small"
                >
                  <span className="text-truncate pe-3" style={{ maxWidth: "80%" }}>
                    {item.product?.title || "Product"}
                  </span>
                  <span className="fw-semibold">{item.qty || 1}</span>
                </div>
              ))}
            </div>

            {/* PRICE DETAILS */}
            <h6 className="fw-bold text-center text-uppercase tracking-wider pb-2 mb-3 border-bottom border-top pt-3">
              Price Details
            </h6>

            <div className="d-flex justify-content-between mb-2 small">
              <span className="text-muted">
                Price ({cart.length} {cart.length === 1 ? "item" : "items"})
              </span>
              <span className="fw-semibold">₹{totalMRP.toFixed(0)}</span>
            </div>

            <div className="d-flex justify-content-between mb-2 small text-success">
              <span>Discount</span>
              <span className="fw-semibold">- ₹{totalDiscount.toFixed(0)}</span>
            </div>

            {couponDiscount > 0 && (
              <div className="d-flex justify-content-between mb-2 small text-success">
                <span>Coupon Discount</span>
                <span className="fw-semibold">- ₹{couponDiscount.toFixed(0)}</span>
              </div>
            )}

            <div className="d-flex justify-content-between mb-3 small">
              <span className="text-muted">Delivery Charges</span>
              <span>
                {totalDelivery > 0 ? (
                  `₹${totalDelivery.toFixed(0)}`
                ) : (
                  <span className="text-success fw-bold">FREE</span>
                )}
              </span>
            </div>

            <div className="d-flex justify-content-between align-items-center py-2 mb-3 border-top border-bottom">
              <span className="fw-bold">Total Amount</span>
              <span className="fs-5 fw-extrabold">
                ₹{finalTotal.toFixed(0)}
              </span>
            </div>

            {/* DELIVER TO */}
            <h6 className="fw-bold text-center text-uppercase tracking-wider pb-2 mb-2 border-bottom">
              Deliver To
            </h6>
            {selectedAddress && (
              <div className="small text-muted mb-4">
                <p className="fw-bold text-body mb-1">{selectedAddress.name}</p>
                <p className="mb-1">
                  {selectedAddress.street}, {selectedAddress.city},{" "}
                  {selectedAddress.state} - {selectedAddress.zip}
                </p>
                <p className="mb-0">Phone: {selectedAddress.phone}</p>
              </div>
            )}

            <button
              className="btn attirex-btn-primary w-100 py-2 rounded-1 fw-bold text-uppercase"
              onClick={doCheckout}
              disabled={cart.length === 0}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <PopupMessage
        show={popup.show}
        message={popup.message}
        onClose={closePopup}
      />
    </div>
  );
};
