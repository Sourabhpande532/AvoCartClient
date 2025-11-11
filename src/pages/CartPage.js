import { useAppFeatures } from "../contexts/AppContext"

export const CartPage = () => {
  const { cart, loading, updateCartQty, removeFromCart, addToWishlist } = useAppFeatures();
  //   const total = cart.reduce((sum, item)=> sum + (item?.product?.price * item?.qty), 0);
  const total = cart?.reduce( ( sum, item ) => sum + ( item.product?.price * item?.qty ), 0 );

  return (
    <div className="">
      <div className="row">
        <div className="col-md-8">
          <h4>My Cart</h4>
          { cart.length === 0 && <p>Your cart is empty</p> }
          { loading && <p className="text-center">Loading....</p> }
          { Array.isArray( cart ) && cart.length > 0 &&
            cart.map( ci => (
              <div key={ ci._id } className="card mb-2 p-2">
                <div className="d-flex">
                  <img src={ ci?.product?.images?.[0] || 'https://picsum.photos/id/1/200/300' } alt="imgCart" style={ { width: 100, height: 100, objectFit: 'cover' } } />
                  <div className="ms-3 flex-grow-1">
                    <h6>{ ci.product?.title }</h6>
                    <p>₹ { ci.product?.price }</p>
                    <div className="d-flex align-items-center gap-2">
                      <button className="btn btn-sm btn-outline-secondary"
                        onClick={ () => updateCartQty( ci?._id, Math.max( 1, ci?.qty - 1 ) ) }
                      >-</button>
                      <span>{ ci?.qty }</span>
                      <button className="btn btn-sm btn-outline-secondary"
                        onClick={ () => updateCartQty( ci?._id, ci.qty + 1 ) }
                      >+</button>
                      <button className="btn btn-sm btn-outline-danger" onClick={ () => removeFromCart( ci?._id ) }>Remove</button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={ () => addToWishlist( ci.product?._id ) }>Move to wishlist</button>
                    </div>
                  </div>
                </div>
              </div>
            ) )
          }
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h5>Price Details</h5>
            <p>Items: { cart.length }</p>
            <p>Total:
              <strong>  ₹{ `${ total }` }</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
