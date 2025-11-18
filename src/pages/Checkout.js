import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState } from "react";

export const Checkout = ({ showPopup }) => {
  const { cart, addresses, placeOrders } = useAppFeatures();
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses?.[0]?._id || null
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (addresses && addresses.length && !selectedAddressId) {
      setSelectedAddressId(addresses[0]._id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  // ---------------- TOTAL ------------------
  const { finalTotal } = cart.reduce(
    (acc, item) => {
      if (!item?.product) return acc;

      const { price = 0, discount = 0, deliveryCharge = 0 } = item.product;
      const qty = item.qty || 1;

      const discountAmount = (price * discount) / 100;
      acc.finalTotal += (price - discountAmount) * qty + deliveryCharge;

      return acc;
    },
    { finalTotal: 0 }
  );

  const doCheckout = async () => {
    const selectedAddress =
      addresses.find((a) => a._id === selectedAddressId) || null;

    if (!selectedAddress) return showPopup("Please select an address");
    if (cart.length === 0) return showPopup("Cart is empty");

    const order = await placeOrders({
      items: cart.map((ci) => ({ product: ci.product._id, qty: ci.qty })),
      total: finalTotal,
      address: selectedAddress,
    });

    if (order) navigate("/profile");
  };

  return (
    <div className="checkout-ui">

      <h5 className="fw-bold mb-3">Choose Delivery Address</h5>

      {addresses.length === 0 && (
        <p className="text-muted">No addresses found. Add one from profile.</p>
      )}

      {/* ADDRESSES */}
      <div className="mb-3">
        {addresses.map((a) => (
          <div
            key={a._id}
            className={`card p-3 mb-2 address-card ${
              selectedAddressId === a._id ? "border-primary shadow-sm" : ""
            }`}
            onClick={() => setSelectedAddressId(a._id)}
            style={{ cursor: "pointer" }}
          >
            <p className="mb-1">
              <strong>{a.name}</strong> — {a.phone}
            </p>
            <p className="mb-0 text-muted small">
              {a.street}, {a.city}, {a.state} - {a.zip}
            </p>
          </div>
        ))}
      </div>

      {/* ORDER SUMMARY */}
      <div className="card p-3 shadow-sm rounded-3 mt-3">
        <h5 className="fw-bold mb-3">Order Summary</h5>

        <div className="d-flex justify-content-between mb-2">
          <span>Items:</span>
          <strong>{cart.length}</strong>
        </div>

        <div className="d-flex justify-content-between mb-3">
          <span>Total:</span>
          <strong>₹{finalTotal}</strong>
        </div>

        {/* FULL WIDTH BUTTON ALWAYS RESPONSIVE */}
        <button className="btn btn-success w-100 py-2" onClick={doCheckout}>
          Place Order
        </button>
      </div>
    </div>
  );
};
