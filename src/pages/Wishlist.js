/* eslint-disable react/jsx-no-comment-textnodes */

import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";

/* eslint-disable jsx-a11y/alt-text */
export const Wishlist = () => {
  const { wishlist, addToCart, removeFromWishlist } = useAppFeatures();
  const navigate = useNavigate();
  return (
    <div>
      <h4>My Wishlist</h4>
      {wishlist.length === 0 && <p>Your wishlist is empty</p>}
      <div className='row'>
        {Array.isArray(wishlist) &&
          wishlist.length > 0 &&
          wishlist.map((w) => (
            <div key={w._id} className='col-md-4 mb-3'>
              <div className='card'>
                <img
                  src={
                    w?.product?.images?.[0] ||
                    "https://picsum.photos/id/2/209/300"
                  }
                  className='card-img-top'
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className='card-body'>
                  <h6
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/products/${w?.product?._id}`)}>
                    {w?.product?.title}
                  </h6>
                  <p>₹ {w?.product?.price}</p>
                  <div className='d-flex gap-2'>
                    <button
                      className='btn btn-primary btn-sm'
                      onClick={() => addToCart(w.product._id)}>
                      Add to Cart
                    </button>
                    <button
                      className='btn btn-outline-danger btn-sm'
                      onClick={() => removeFromWishlist(w._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

/* 
export default function Wishlist(){
  const { wishlist, removeFromWishlist, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <div>
      <h4>My Wishlist</h4>
      {wishlist.length===0 && <p>Your wishlist is empty</p>}
      <div className="row">
        {wishlist.map(w => (
          <div key={w._id} className="col-md-4 mb-3">
            <div className="card">
              <img src={w.product.images?.[0]||'https://via.placeholder.com/300'} className="card-img-top" style={{height:200, objectFit:'cover'}} />
              <div className="card-body">
                <h6 style={{cursor:'pointer'}} onClick={()=> navigate(`/products/${w.product._id}`)}>{w.product.title}</h6>
                <p>₹{w.product.price}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={()=> addToCart(w.product._id)}>Add to Cart</button>
                  <button className="btn btn-outline-danger btn-sm" onClick={()=> removeFromWishlist(w._id)}>Remove</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

*/
