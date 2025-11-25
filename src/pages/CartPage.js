import { useState } from "react";
import PopupMessage from "../components/PopupMessage";
import { useAppFeatures } from "../contexts/AppContext";
import { Checkout } from "./Checkout";

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
    <div className='container py-4'>
      <div className='row g-4'>
        {/* ---------------- LEFT CART ITEMS ---------------- */}
        <div className='col-lg-7 col-md-12'>
          <h4 className='mb-3 fw-bold'>🛒 My Cart</h4>

          {loading && <p className='text-center'>Loading...</p>}
          {!loading && filteredCart.length === 0 && (
            <div className='alert alert-warning text-center'>
              Your cart is empty
            </div>
          )}

          {filteredCart.map((ci) => (
            <div
              key={ci._id}
              className='card border-0 shadow-sm p-3 mb-3 rounded-4'>
              {!ci.product ? (
                <p className='text-danger'>Product unavailable</p>
              ) : (
                <div className='row g-3 align-items-center'>
                  {/* Product Image */}
                  <div className='col-12 col-sm-3 text-center'>
                    <img
                      src={
                        ci?.product?.images?.[0] || "https://picsum.photos/200"
                      }
                      alt='cart-img'
                      className='img-fluid rounded'
                      style={{
                        height: 120,
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  {/* Product Details */}
                  <div className='col-12 col-sm-9'>
                    <h6 className='fw-semibold mb-1'>{ci.product.title}</h6>

                    <p className='text-muted mb-1'>
                      ₹{ci.product.price}{" "}
                      <span className='text-success small'>
                        {ci.product.discount}% off
                      </span>
                    </p>

                    {ci.size && (
                      <p className='mb-1'>
                        <strong>Size:</strong>{" "}
                        <span className='badge bg-dark'>{ci.size}</span>
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className='d-flex flex-wrap align-items-center gap-2 mt-2'>
                      {/* Quantity Buttons - Minimal Clean */}
                      <div className='d-flex align-items-center border rounded px-2 py-1'>
                        <button
                          className='btn btn-sm px-2'
                          style={{ fontSize: 18, fontWeight: "bold" }}
                          onClick={() =>
                            updateCartQty(
                              ci._id,
                              Math.max(1, ci.qty - 1),
                              ci.qty
                            )
                          }>
                          −
                        </button>

                        <span className='mx-2 fw-bold'>{ci.qty}</span>

                        <button
                          className='btn btn-sm px-2'
                          style={{ fontSize: 18, fontWeight: "bold" }}
                          onClick={() =>
                            updateCartQty(ci._id, ci.qty + 1, ci.qty)
                          }>
                          +
                        </button>
                      </div>

                      {/* Remove */}
                      <button
                        className='btn btn-sm btn-outline-danger'
                        onClick={() => removeFromCart(ci._id)}>
                        🗑 Remove
                      </button>

                      {/* Wishlist */}
                      <button
                        className='btn btn-sm btn-outline-primary'
                        onClick={() => addToWishlist(ci.product._id)}>
                        ❤️ Move to Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ---------------- RIGHT PRICE DETAILS ---------------- */}
        <div className='col-lg-5 col-md-6 col-12'>
          <div className='card p-4 shadow-lg rounded-4'>
            <h5 className='fw-bold border-bottom pb-2'>Price Details</h5>

            <div className='d-flex justify-content-between my-2'>
              <span>Total MRP:</span>
              <strong>₹ {totalMRP.toFixed(2)}</strong>
            </div>

            <div className='d-flex justify-content-between my-2 text-success'>
              <span>You Saved:</span>
              <strong>₹ {totalDiscount.toFixed(2)}</strong>
            </div>

            <div className='d-flex justify-content-between my-2'>
              <span>Delivery Charges:</span>
              <strong>₹ {totalDelivery.toFixed(2)}</strong>
            </div>

            <hr />

            <div className='d-flex justify-content-between my-2 fs-5'>
              <span className='fw-bold'>Final Amount:</span>
              <strong>₹ {finalAmount.toFixed(2)}</strong>
            </div>

            <div className='mt-4'>
              <Checkout showPopup={showPopup} />
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
