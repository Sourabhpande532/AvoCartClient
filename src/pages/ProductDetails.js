import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import API from "../api/api";
import { AppContext } from "../contexts/AppContext";
import PopupMessage from "../components/PopupMessage";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, globalSearch, setGlobalSearch } =
    useContext(AppContext);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("");
  const [popup, setPopup] = useState({ show: false, message: "" });
  const showPopup = (msg) => setPopup({ show: true, message: msg });
  const closePopup = () => setPopup({ show: false, message: "" });

  useEffect(() => {
    async function fetchProductData() {
      try {
        // 🔍 When user searches something
        if (globalSearch && globalSearch.trim().length > 0) {
          const searchResponse = await API.get(
            `/products?search=${globalSearch}`
          );
          const searchResults = searchResponse.data.data.products;

          if (searchResults.length > 0) {
            const matchedProduct = searchResults[0]; // show first matched product
            setProduct(matchedProduct);

            if (matchedProduct?.category?._id) {
              const relatedResponse = await API.get(
                `/products?category=${matchedProduct.category._id}`
              );
              const relatedItems = relatedResponse.data.data.products || [];

              setRelated(
                relatedItems.filter((item) => item._id !== matchedProduct._id)
              );
            }
          } else {
            setProduct(null);
            setRelated([]);
          }
          return;
        }

        // 👇 Normal load using ID
        const productResponse = await API.get(`/products/${id}`);
        const currentProduct = productResponse.data.data.product;
        setProduct(currentProduct);

        if (currentProduct?.category?._id) {
          const relatedResponse = await API.get(
            `/products?category=${currentProduct.category._id}`
          );
          const relatedProducts = relatedResponse.data.data.products || [];

          setRelated(relatedProducts.filter((item) => item._id !== id));
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchProductData();
  }, [id, globalSearch]);

  useEffect(() => {
    setGlobalSearch("");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!product) return <div className='text-center mt-5'>Loading...</div>;

  const originalPrice = product.price + Math.floor(product.price * 0.4);

  const handleAddToCart = async () => {
    if (!selectedSize) {
      showPopup("Please select a size");
      return;
    }
    await addToCart(product._id, qty, selectedSize);
  };

  return (
    <div className='container py-5 fade-in'>
      <div className='row g-5'>
        <div className='col-lg-6'>
          <div className='card border-0 shadow-lg overflow-hidden' style={{ borderRadius: '20px' }}>
            <img
              src={product.images && product.images[0] ? product.images[0] : `https://placehold.co/600x600/6366f1/ffffff?text=${encodeURIComponent(product.title)}`}
              className='img-fluid w-100'
              alt={product.title}
              style={{ objectFit: "cover", minHeight: "500px" }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = `https://placehold.co/600x600/6366f1/ffffff?text=${encodeURIComponent(product.title)}`;
              }}
            />
          </div>
        </div>
        <div className='col-lg-6'>
          <nav aria-label="breadcrumb" className="mb-3">
            <ol className="breadcrumb small text-uppercase tracking-wider">
              <li className="breadcrumb-item"><Link to="/" className="text-decoration-none">Home</Link></li>
              <li className="breadcrumb-item"><Link to="/products" className="text-decoration-none">Products</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{product.category?.name}</li>
            </ol>
          </nav>
          
          <h1 className='display-5 fw-bold mb-2'>{product.title}</h1>
          
          <div className='mb-4 d-flex align-items-center gap-3'>
            <span className='badge bg-warning text-dark px-3 py-2 rounded-pill'>
              ★ {product.rating}
            </span>
            <span className="text-muted small">2.5k reviews</span>
          </div>

          <div className="mb-4">
            <div className="d-flex align-items-baseline gap-3 mb-1">
              <h2 className='fw-bold text-primary mb-0'>₹{product.price}</h2>
              <span className='text-decoration-line-through text-muted fs-5'>
                ₹{originalPrice}
              </span>
              <span className='badge bg-danger-subtle text-danger px-2 py-1'>
                {Math.round(((originalPrice - product.price) / originalPrice) * 100)}% OFF
              </span>
            </div>
            <p className="text-success small fw-semibold">Inclusive of all taxes</p>
          </div>

          <div className='mb-4'>
            <h6 className="fw-bold text-uppercase small mb-3">Select Size</h6>
            <div className='d-flex flex-wrap gap-2'>
              {["S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  className={`btn rounded-circle d-flex align-items-center justify-content-center p-0 ${
                    selectedSize === s ? "btn-primary" : "btn-outline-secondary"
                  }`}
                  style={{ width: '45px', height: '45px', fontWeight: '600' }}
                  onClick={() => setSelectedSize(s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className='mb-5'>
            <h6 className="fw-bold text-uppercase small mb-3">Quantity</h6>
            <div className="d-flex align-items-center gap-4">
              <div className='btn-group border rounded-pill p-1'>
                <button
                  className='btn btn-link text-decoration-none px-3'
                  disabled={qty <= 1}
                  onClick={() => setQty(qty - 1)}>
                  -
                </button>
                <span className='px-2 align-self-center fw-bold'>{qty}</span>
                <button
                  className='btn btn-link text-decoration-none px-3'
                  onClick={() => setQty(qty + 1)}>
                  +
                </button>
              </div>
              
              <div className="flex-grow-1 d-flex gap-2">
                <button
                  className='btn btn-primary btn-lg flex-grow-1 rounded-pill px-4'
                  onClick={handleAddToCart}>
                  Add to Cart
                </button>
                <button
                  className='btn btn-outline-danger btn-lg rounded-circle p-0 d-flex align-items-center justify-content-center'
                  style={{ width: '56px', height: '56px' }}
                  onClick={() => {
                    addToWishlist(product._id);
                  }}>
                  ❤
                </button>
              </div>
            </div>
          </div>

          <div className='row g-4 mb-5'>
            {[
              { icon: '🚚', label: '10 days', sub: 'Returnable' },
              { icon: '💵', label: 'Pay on', sub: 'Delivery' },
              { icon: '✈️', label: 'Free', sub: 'Shipping' },
              { icon: '🛡️', label: 'Secure', sub: 'Checkout' }
            ].map((feature, i) => (
              <div key={i} className='col-3 text-center'>
                <div className="fs-3 mb-1">{feature.icon}</div>
                <div className='small fw-bold'>{feature.label}</div>
                <div className='small text-muted'>{feature.sub}</div>
              </div>
            ))}
          </div>

          <div className="card bg-light border-0">
            <div className="card-body p-4">
              <h6 className="fw-bold text-uppercase small mb-3">Product Description</h6>
              <ul className="mb-0 text-muted small">
                {product.description
                  ?.split(".")
                  .map((line, idx) =>
                    line.trim() ? <li key={idx} className="mb-2">{line.trim()}.</li> : null
                  )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <PopupMessage
        show={popup.show}
        message={popup.message}
        onClose={closePopup}
      />

      <div className='mt-5 pt-5'>
        <div className="d-flex justify-content-between align-items-end mb-4">
          <div>
            <h4 className='fw-bold mb-1'>More items you may like</h4>
            <p className="text-muted">Customers who viewed this also liked these</p>
          </div>
        </div>
        <div className='row g-4'>
          {related.slice(0, 4).map((item) => (
            <div key={item._id} className='col-6 col-md-3'>
              <div className='card h-100 border-0 shadow-sm overflow-hidden'>
                <div className="position-relative overflow-hidden" style={{ height: "200px", cursor: 'pointer' }} onClick={() => navigate(`/products/${item._id}`)}>
                  <img
                    src={item.images && item.images[0] ? item.images[0] : `https://placehold.co/400x300/6366f1/ffffff?text=${encodeURIComponent(item.title)}`}
                    className='w-100 h-100 object-fit-cover hover-scale'
                    alt={item.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/400x300/6366f1/ffffff?text=${encodeURIComponent(item.title)}`;
                    }}
                  />
                </div>
                <div className='card-body p-3'>
                  <h6 className='fw-bold text-truncate mb-1'>{item.title}</h6>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold text-primary">₹{item.price}</span>
                    <button
                      className='btn btn-sm btn-primary rounded-pill'
                      onClick={() => addToCart(item._id, 1, "S")}>
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
