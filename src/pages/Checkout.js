import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState } from "react";
export const Checkout = ({showPopup}) => {
  const { cart, addresses, placeOrders } = useAppFeatures();
  const [selectedAddressId, setSelectedAddressId] = useState(
    addresses?.[0]?._id || null
  );
  const navigate = useNavigate();

  useEffect(
    () => {
      if (addresses && addresses.length && !selectedAddressId)
        setSelectedAddressId(addresses[0]._id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addresses]
  );

  const { finalTotal } = cart.reduce(
    (acc, item) => {
      if (!item?.product) return acc; // Skip if product missing

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
    if (!selectedAddress) {
      showPopup("Please select an address");
      return;
    }
    const order = await placeOrders({
      items: cart.map((ci) => ({ product: ci.product._id, qty: ci.qty })),
      total: finalTotal,
      address: selectedAddress,
    });
    if (order) {
      navigate("/profile");
    }
  };

  return (
    <div className='row'>
      <div className='col-md-8'>
        <h4>Choose Delivery Address</h4>
        {addresses.length === 0 && (
          <p>No addresses found. Add from profile page.</p>
        )}
        {addresses.map((a) => (
          <div
            key={a._id}
            className={`card mb-2 p-2 ${
              selectedAddressId === a._id ? "border-primary" : ""
            }`}
            onClick={() => setSelectedAddressId(a._id)}
            style={{ cursor: "pointer" }}>
            <p>
              <strong>{a.name}</strong> - {a.phone}
            </p>
            <p>
              {a.street}, {a.city}, {a.state} - {a.zip}
            </p>
          </div>
        ))}
      </div>
      <div className='col-md-4'>
        <div className='card p-3'>
          <h5>Order Summary</h5>
          <p>Items: {cart.length}</p>
          <p>Total: ₹{finalTotal}</p>
          <button className='btn btn-success' onClick={doCheckout}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};
