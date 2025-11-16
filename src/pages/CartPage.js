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
    <div className='container py-4'>
      <div className='row g-3'>
        {/* LEFT CART SECTION */}
        <div className='col-lg-8'>
          <h4 className='mb-3 fw-bold'>🛒 My Cart</h4>

          {loading && <p className='text-center'>Loading...</p>}
          {filteredCart.length === 0 && (
            <div className='alert alert-warning text-center'>
              Your cart is empty
            </div>
          )}

          {filteredCart.map((ci) => (
            <div
              key={ci._id}
              className='card shadow-sm mb-3 p-3 border-0 rounded-3'>
              {!ci.product ? (
                <p className='text-danger'>Product unavailable</p>
              ) : (
                <div className='row align-items-center'>
                  {/* Product Image */}
                  <div className='col-12 col-sm-3 text-center'>
                    <img
                      src={
                        ci?.product?.images?.[0] || "https://picsum.photos/200"
                      }
                      alt='cart-product'
                      className='rounded'
                      style={{
                        width: "100%",
                        maxWidth: 120,
                        height: 120,
                        objectFit: "cover",
                      }}
                    />
                  </div>

                  {/* Details */}
                  <div className='col-12 col-sm-9 mt-3 mt-sm-0'>
                    <h6 className='fw-semibold'>{ci.product?.title}</h6>

                    <p className='text-muted mb-1'>
                      ₹{ci.product?.price}{" "}
                      <span className='text-success small ms-1'>
                        {ci.product?.discount}% Off
                      </span>
                    </p>

                    {/* Quantity & Actions */}
                    <div className='d-flex flex-wrap align-items-center gap-2 mt-2'>
                      {/* Qty Group */}
                      <div className='btn-group' role='group'>
                        <button
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() =>
                            updateCartQty(
                              ci._id,
                              Math.max(1, ci.qty - 1),
                              ci.qty
                            )
                          }>
                          -
                        </button>

                        <button className='btn btn-sm btn-light px-3'>
                          {ci.qty}
                        </button>

                        <button
                          className='btn btn-sm btn-outline-secondary'
                          onClick={() =>
                            updateCartQty(ci._id, ci.qty + 1, ci.qty)
                          }>
                          +
                        </button>
                      </div>

                      <button
                        className='btn btn-sm btn-outline-danger'
                        onClick={() => removeFromCart(ci._id)}>
                        🗑 Remove
                      </button>

                      <button
                        className='btn btn-sm btn-outline-primary'
                        onClick={() => addToWishlist(ci.product?._id)}>
                        ❤️ Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* PRICE DETAILS SECTION */}
        <div className='col-lg-4'>
          <div className='card p-3 shadow-sm rounded-3'>
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

            <div className='mt-3'>
              <Checkout />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
