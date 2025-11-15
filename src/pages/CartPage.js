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

  const filteredCart = (cart || []).filter((ci) =>
    (ci?.product?.title || "")
      .toLowerCase()
      .includes((globalSearch || "").toLowerCase())
  );

  // 💰 Calculate totals
  const { totalMRP, totalDiscount, totalDelivery, finalAmount } =
    filteredCart.reduce(
      (acc, curr) => {
        if (!curr.product) return acc; // Skip if product is missing

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
  /* 
This means:
return acc; !product 
Do not add any price
Do not add any discount
Do not add delivery charge
Keep the totals exactly same
Move to next Cart item
*/

  return (
    <div className=''>
      <div className='row'>
        <div className='col-md-8'>
          <h4>My Cart</h4>
          {filteredCart.length === 0 && <p>Your Cart is empty</p>}
          {loading && <p className='text-center'>Loading....</p>}
          {Array.isArray(filteredCart) &&
            filteredCart.length > 0 &&
            filteredCart.map((ci) => (
              <div key={ci._id} className='card mb-2 p-2'>
                {!ci.product ? (
                  <p className='text-danger'>Product unavailable</p>
                ) : (
                  <div className='d-flex'>
                    <img
                      src={
                        ci?.product?.images?.[0] ||
                        "https://picsum.photos/id/1/200/300"
                      }
                      alt='imgCart'
                      style={{ width: 100, height: 100, objectFit: "cover" }}
                    />
                    <div className='ms-3 flex-grow-1'>
                      <h6>{ci.product?.title}</h6>
                      <p>₹ {ci.product?.price}</p>
                      <div className='d-flex align-items-center gap-2'>
                        <button
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() =>
                            updateCartQty(ci?._id, Math.max(1, ci?.qty - 1))
                          }>
                          -
                        </button>
                        <span>{ci?.qty}</span>
                        <button
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => updateCartQty(ci?._id, ci.qty + 1)}>
                          +
                        </button>
                        <button
                          className='btn btn-sm btn-outline-danger'
                          onClick={() => removeFromCart(ci?._id)}>
                          Remove
                        </button>
                        <button
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() => addToWishlist(ci.product?._id)}>
                          Move to wishlist
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>

        {/* 🧾 PRICE DETAILS CARD */}
        <div className='col-md-4'>
          <div className='card p-3'>
            <h5>Price Details</h5>
            <p>
              Total MRP: <strong>₹ {totalMRP.toFixed(2)}</strong>
            </p>
            <p style={{ color: "green" }}>
              You Saved: <strong>₹{totalDiscount.toFixed(2)}</strong> 🎉 on (
              <strong>25% Off</strong>)
            </p>
            <p>
              Delivery Charges(199Rs):{" "}
              <strong> ₹{totalDelivery.toFixed(2)}</strong>
            </p>
            <hr />
            <h5>
              Final Amount: <strong>₹{finalAmount.toFixed(2)}</strong>
            </h5>
            <Checkout />
          </div>
        </div>
      </div>
    </div>
  );
};
