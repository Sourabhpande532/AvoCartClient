import { useNavigate, Link } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState, useMemo } from "react";
import PopupMessage from "../components/PopupMessage";

export const Checkout = () => {
  const { cart, addresses, placeOrders } = useAppFeatures();
  const [popup, setPopup] = useState({ show: false, message: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  const showPopup = (msg) => setPopup({ show: true, message: msg });
  const closePopup = () => setPopup({ show: false, message: "" });

  const mockAddress = useMemo(() => ({
    _id: "mock_address_default",
    name: "John Doe (Default)",
    phone: "9876543210",
    street: "123 Default Street",
    city: "Metropolis",
    state: "NY",
    zip: "10001"
  }), []);

  const displayAddresses = addresses && addresses.length > 0 ? addresses : [mockAddress];

  const [selectedAddressId, setSelectedAddressId] = useState(
    displayAddresses[0]?._id
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (displayAddresses.length > 0 && !selectedAddressId) {
      setSelectedAddressId(displayAddresses[0]._id);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addresses]);

  const { finalTotal, totalMRP, totalDiscount, totalDelivery } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        if (!item?.product) return acc;

        const { price = 0, discount = 0, deliveryCharge = 0 } = item.product;
        const qty = item.qty || 1;

        const itemTotal = price * qty;
        const discountAmount = (itemTotal * discount) / 100;

        acc.totalMRP += itemTotal;
        acc.totalDiscount += discountAmount;
        acc.totalDelivery += deliveryCharge;
        acc.finalTotal += (itemTotal - discountAmount) + deliveryCharge;

        return acc;
      },
      { finalTotal: 0, totalMRP: 0, totalDiscount: 0, totalDelivery: 0 }
    );
  }, [cart]);

  const doCheckout = async () => {
    const selectedAddress =
      displayAddresses.find((a) => a._id === selectedAddressId) || null;

    if (!selectedAddress) return showPopup("Please select an address");
    if (cart.length === 0) return showPopup("Cart is empty");

    const order = await placeOrders({
      items: cart.map((ci) => ({ product: ci.product._id, qty: ci.qty })),
      total: finalTotal,
      address: selectedAddress,
    });

    if (order) {
      setOrderPlaced(true);
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  };

  if (orderPlaced) {
    return (
      <div className="container py-5 text-center fade-in">
        <div className="card border shadow-sm rounded-4 p-5 mx-auto" style={{ maxWidth: '560px' }}>
          <div className="fs-1 text-success mb-3">✅</div>
          <h2 className="fw-bold mb-3">Order Confirmed!</h2>
          <p className="text-muted small mb-4">Thank you for your order with AvoCart. We are processing your delivery details now.</p>
          <div className="d-flex justify-content-center">
            <Link to="/profile" className="btn btn-primary px-4 py-2 rounded-3 fw-semibold">View Order History</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 fade-in">
      <h2 className="fw-bold mb-4">Checkout</h2>
      
      <div className="row g-5">
        {/* LEFT COLUMN: Addresses */}
        <div className="col-lg-7">
          <div className="card border shadow-sm rounded-4 p-4 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0 text-body">Select Delivery Address</h5>
              <Link to="/profile" className="btn btn-sm btn-outline-primary rounded-2 fw-semibold">Add New Address</Link>
            </div>

            <div className="d-flex flex-column gap-3">
              {displayAddresses.map((a) => (
                <div
                  key={a._id}
                  className={`card p-3 address-card rounded-3 transition-all ${
                    selectedAddressId === a._id ? "border-primary bg-primary-subtle shadow-sm" : "border"
                  }`}
                  onClick={() => setSelectedAddressId(a._id)}
                  style={{ cursor: "pointer" }}
                >
                  <div className="d-flex align-items-start gap-3">
                    <div className="mt-1">
                      <input 
                        type="radio" 
                        className="form-check-input"
                        name="addressSelection" 
                        checked={selectedAddressId === a._id}
                        onChange={() => setSelectedAddressId(a._id)}
                      />
                    </div>
                    <div>
                      <p className="mb-1 fw-bold text-body">
                        {a.name} <span className="text-muted fw-normal small ms-2">{a.phone}</span>
                      </p>
                      <p className="mb-0 text-muted small">
                        {a.street}, {a.city}, {a.state} - {a.zip}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Order Summary */}
        <div className="col-lg-5">
          <div className="card border shadow-sm rounded-4 p-4 sticky-top" style={{ top: '100px' }}>
            <h5 className="fw-bold mb-4 text-body">Summary Breakdown</h5>

            <div className="d-flex justify-content-between mb-3 text-muted small">
              <span>Items ({cart.length})</span>
              <span>₹{totalMRP.toFixed(2)}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-3 text-success small">
              <span>Discount</span>
              <span>- ₹{totalDiscount.toFixed(2)}</span>
            </div>
            
            <div className="d-flex justify-content-between mb-3 text-muted small">
              <span>Shipping</span>
              <span>{totalDelivery > 0 ? `₹${totalDelivery.toFixed(2)}` : <span className="text-success fw-bold">FREE</span>}</span>
            </div>

            <hr className="my-4 opacity-25" />

            <div className="d-flex justify-content-between align-items-center mb-4">
              <span className="fs-5 fw-bold text-body">Total Amount</span>
              <span className="fs-4 fw-extrabold text-primary">₹{finalTotal.toFixed(2)}</span>
            </div>

            <button 
              className="btn btn-primary btn-lg w-100 rounded-3 fw-bold shadow-sm" 
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
