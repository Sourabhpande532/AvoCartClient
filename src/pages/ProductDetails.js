import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { AppContext } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import PopupMessage from "../components/PopupMessage";
import { getFallbackImage } from "../utils/fallbackImage";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, globalSearch, setGlobalSearch } =
    useContext(AppContext);
  const { isAuthenticated, setShowAuthModal } = useAuth();

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
        if (globalSearch && globalSearch.trim().length > 0) {
          const searchResponse = await API.get(
            `/products?search=${globalSearch}`
          );
          const searchResults = searchResponse.data.data.products;

          if (searchResults.length > 0) {
            const matchedProduct = searchResults[0];
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

  if (!product) return <div className='text-center py-5 text-muted'>Loading details...</div>;

  const originalPrice = product.price + Math.floor(product.price * 0.4);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (!selectedSize) {
      showPopup("Please select a size");
      return;
    }
    await addToCart(product._id, qty, selectedSize);
  };

  return (
    <>
      <div className='container py-5 fade-in'>
        <div className='row g-5'>
          {/* Left Column: Product Image */}
          <div className='col-lg-6'>
            <div className='card border shadow-sm overflow-hidden rounded-4'>
              <img
                src={product.images && product.images[0] ? product.images[0] : getFallbackImage(product.title)}
                className='img-fluid w-100 object-fit-cover'
                alt={product.title}
                style={{ minHeight: "480px", maxHeight: "560px" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = getFallbackImage(product.title);
                }}
              />
            </div>
          </div>

          {/* Right Column: Details & Actions */}
          <div className='col-lg-6'>
            <nav aria-label="breadcrumb" className="mb-3">
              <ol className="breadcrumb small text-uppercase tracking-wider text-muted">
                <li className="breadcrumb-item"><Link to="/" className="text-decoration-none text-muted">Home</Link></li>
                <li className="breadcrumb-item"><Link to="/products" className="text-decoration-none text-muted">Products</Link></li>
                <li className="breadcrumb-item active text-body" aria-current="page">{product.category?.name}</li>
              </ol>
            </nav>
            
            <h1 className='display-6 fw-extrabold mb-2 text-body'>{product.title}</h1>
            
            <div className='mb-4 d-flex align-items-center gap-3'>
              <span className='badge rounded-pill px-3 py-2 fw-semibold' style={{ background: '#fef3c7', color: '#92400e' }}>
                ★ {product.rating}
              </span>
              <span className="text-muted small">2.5k customer reviews</span>
            </div>

            <div className="mb-4 p-3 bg-body-tertiary rounded-3 border">
              <div className="d-flex align-items-baseline gap-3 mb-1">
                <h2 className='fw-extrabold text-primary mb-0'>₹{product.price}</h2>
                <span className='text-decoration-line-through text-muted fs-5'>
                  ₹{originalPrice}
                </span>
                <span className='badge bg-danger text-white px-2 py-1 small'>
                  {Math.round(((originalPrice - product.price) / originalPrice) * 100)}% OFF
                </span>
              </div>
              <p className="text-success small fw-medium mb-0">Inclusive of all applicable taxes</p>
            </div>

            <div className='mb-4'>
              <h6 className="fw-bold text-uppercase small tracking-wider mb-3 text-muted">Select Size</h6>
              <div className='d-flex flex-wrap gap-2'>
                {["S", "M", "L", "XL", "XXL"].map((s) => (
                  <button
                    key={s}
                    className={`btn rounded-3 d-flex align-items-center justify-content-center ${
                      selectedSize === s ? "btn-primary" : "btn-outline-secondary"
                    }`}
                    style={{ width: '48px', height: '48px', fontWeight: '600' }}
                    onClick={() => setSelectedSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className='mb-5'>
              <h6 className="fw-bold text-uppercase small tracking-wider mb-3 text-muted">Quantity</h6>
              <div className="d-flex align-items-center gap-4">
                <div className='btn-group border rounded-3 p-1 bg-body-tertiary'>
                  <button
                    className='btn btn-link text-decoration-none px-3 text-body'
                    disabled={qty <= 1}
                    onClick={() => setQty(qty - 1)}>
                    -
                  </button>
                  <span className='px-2 align-self-center fw-bold text-body'>{qty}</span>
                  <button
                    className='btn btn-link text-decoration-none px-3 text-body'
                    onClick={() => setQty(qty + 1)}>
                    +
                  </button>
                </div>
                
                <div className="flex-grow-1 d-flex gap-2">
                  <button
                    className='btn btn-primary btn-lg flex-grow-1 rounded-3 px-4 fw-semibold shadow-sm'
                    onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                  <button
                    className='btn btn-outline-danger btn-lg rounded-3 p-0 d-flex align-items-center justify-content-center'
                    style={{ width: '52px', height: '52px' }}
                    onClick={() => {
                      if (isAuthenticated) {
                        addToWishlist(product._id);
                      } else {
                        setShowAuthModal(true);
                      }
                    }}
                    title="Add to Wishlist">
                    ❤
                  </button>
                </div>
              </div>
            </div>

            <div className='row g-3 mb-5 py-3 border-top border-bottom'>
              {[
                { icon: '🚚', label: '10 Days Return', sub: 'Hassle free policy' },
                { icon: '💵', label: 'Cash on Delivery', sub: 'Available nationwide' },
                { icon: '✈️', label: 'Free Express Shipping', sub: 'On orders over ₹999' },
                { icon: '🛡️', label: 'Secure Checkout', sub: '256-bit SSL encryption' }
              ].map((feature, i) => (
                <div key={i} className='col-6 col-md-3 text-center'>
                  <div className="fs-4 mb-1">{feature.icon}</div>
                  <div className='small fw-bold text-body'>{feature.label}</div>
                  <div className='small text-muted' style={{ fontSize: '0.75rem' }}>{feature.sub}</div>
                </div>
              ))}
            </div>

            <div className="card border rounded-3">
              <div className="card-body p-4">
                <h6 className="fw-bold text-uppercase small tracking-wider mb-3 text-primary">Product Details</h6>
                <ul className="mb-0 text-muted small" style={{ lineHeight: '1.8' }}>
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

        {/* Related Products */}
        {related.length > 0 && (
          <div className='mt-5 pt-5 border-top'>
            <div className="d-flex justify-content-between align-items-end mb-4">
              <div>
                <h4 className='fw-bold mb-1'>You May Also Like</h4>
                <p className="text-muted small mb-0">Curated recommendations based on this category</p>
              </div>
            </div>
            <div className='row g-4'>
              {related.slice(0, 4).map((item) => (
                <div key={item._id} className='col-6 col-md-3'>
                  <div className='card h-100 border shadow-sm overflow-hidden hover-scale'>
                    <div className="position-relative overflow-hidden bg-body-secondary" style={{ height: "180px", cursor: 'pointer' }} onClick={() => navigate(`/products/${item._id}`)}>
                      <img
                        src={item.images && item.images[0] ? item.images[0] : getFallbackImage(item.title)}
                        className='w-100 h-100 object-fit-cover'
                        alt={item.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getFallbackImage(item.title);
                        }}
                      />
                    </div>
                    <div className='card-body p-3 d-flex flex-column'>
                      <h6 className='fw-bold text-truncate mb-1 text-body' style={{ fontSize: '0.9rem' }}>{item.title}</h6>
                      <div className="d-flex justify-content-between align-items-center mt-auto pt-2">
                        <span className="fw-bold text-primary">₹{item.price}</span>
                        <button
                          className='btn btn-sm btn-outline-primary rounded-2 px-2 py-1 small'
                          onClick={() => {
                            if (isAuthenticated) {
                              addToCart(item._id, 1, "S");
                            } else {
                              setShowAuthModal(true);
                            }
                          }}>
                          + Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <PopupMessage
        show={popup.show}
        message={popup.message}
        onClose={closePopup}
      />
    </>
  );
}
