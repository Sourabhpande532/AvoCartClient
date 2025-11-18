import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { AppContext } from "../contexts/AppContext";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist } = useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await API.get(`/products/${id}`);
        const p = res.data.data.product;
        setProduct(p);
        if (p?.category?._id) {
          const r = await API.get(`/products?category=${p.category._id}`);
          const items = r.data.data.products || [];
          setRelated(items.filter((i) => i._id !== id));
        }
      } catch (err) {
        console.error(err);
      }
    }
    load();
  }, [id]);

  if (!product) return <div className='text-center mt-5'>Loading...</div>;

  const originalPrice = product.price + Math.floor(product.price * 0.4);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    await addToCart(product._id, qty, selectedSize);
  };

  return (
    <div className='container py-4'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='card'>
            <img
              src={product.images?.[0] || "https://via.placeholder.com/600x600"}
              className='card-img-top'
              alt={product.title}
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <h3 className='fw-bold'>{product.title}</h3>
          <p className='text-muted'>{product.category?.name}</p>
          <div className='mb-2 d-flex align-items-center'>
            <span className='fw-bold me-2'>{product.rating}</span>
            <span>⭐</span>
          </div>
          <h4 className='fw-bold text-dark'>₹{product.price}</h4>
          <p>
            <span className='text-decoration-line-through text-muted'>
              ₹{originalPrice}
            </span>
            <span className='text-success fw-bold ms-2'>
              {Math.round(
                ((originalPrice - product.price) / originalPrice) * 100
              )}
              % off
            </span>
          </p>

          <div className='my-3'>
            <strong>Quantity:</strong>
            <div className='d-flex align-items-center mt-2'>
              <button
                className='btn btn-outline-secondary'
                disabled={qty <= 1}
                onClick={() => setQty(qty - 1)}>
                -
              </button>
              <span className='px-3'>{qty}</span>
              <button
                className='btn btn-outline-secondary'
                onClick={() => setQty(qty + 1)}>
                +
              </button>
            </div>
          </div>

          <div className='my-3'>
            <strong>Size:</strong>
            <div className='mt-2'>
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  className={`btn me-2 ${
                    selectedSize === s ? "btn-dark" : "btn-outline-dark"
                  }`}
                  onClick={() => setSelectedSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className='d-flex mt-4'>
            <button
              className='btn btn-primary btn-lg me-3'
              onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className='btn btn-outline-danger btn-lg'
              onClick={() => {
                addToWishlist(product._id);
                navigate("/wishlist");
              }}>
              ❤ Wishlist
            </button>
          </div>

          <div className='row text-center mt-4'>
            <div className='col-3'>
              <div className='small'>
                10 days
                <br />
                Returnable
              </div>
            </div>
            <div className='col-3'>
              <div className='small'>
                Pay on
                <br />
                Delivery
              </div>
            </div>
            <div className='col-3'>
              <div className='small'>
                Free
                <br />
                Delivery
              </div>
            </div>
            <div className='col-3'>
              <div className='small'>
                Secure
                <br />
                Payment
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='mt-5'>
        <h5 className='fw-bold'>Description:</h5>
        <ul>
          {product.description
            ?.split(".")
            .map((line, idx) =>
              line.trim() ? <li key={idx}>{line.trim()}.</li> : null
            )}
        </ul>
      </div>

      <div className='mt-5'>
        <h4 className='fw-bold mb-3'>More items you may like</h4>
        <div className='row'>
          {related.map((item) => (
            <div key={item._id} className='col-md-3 col-6 mb-4'>
              <div className='card h-100'>
                <img
                  src={item.images?.[0] || "https://via.placeholder.com/400"}
                  className='card-img-top'
                  alt={item.title}
                  style={{ height: 200, objectFit: "cover" }}
                />
                <div className='card-body text-center d-flex flex-column'>
                  <h6 className='fw-bold' style={{ fontSize: 14 }}>
                    {item.title}
                  </h6>
                  <p className='fw-bold'>₹{item.price}</p>
                  <button
                    className='btn btn-sm btn-dark mt-auto'
                    onClick={() => addToCart(item._id, 1,"S")}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
