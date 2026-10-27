import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import API from "../api/api";
import { AppContext } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";
import PopupMessage from "../components/PopupMessage";
import Loading from "../components/Loading";
import {
  getFallbackImage,
  getProductImage,
  normalizeProduct,
  normalizeProductList,
} from "../utils/fallbackImage";

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    addToCart,
    addToWishlist,
    removeFromWishlist,
    wishlist,
  } = useContext(AppContext);
  const { isAuthenticated, setShowAuthModal } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [detailLoading, setDetailLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [popup, setPopup] = useState({ show: false, message: "" });
  const showPopup = (msg) => setPopup({ show: true, message: msg });
  const closePopup = () => setPopup({ show: false, message: "" });

  useEffect(() => {
    let isMounted = true;
    async function fetchProductData() {
      setDetailLoading(true);
      setNotFound(false);
      setQty(1);
      setSelectedSize("M");
      try {
        const productResponse = await API.get(`/products/${id}`);
        const rawProduct = productResponse.data?.data?.product;
        if (!rawProduct) {
          if (isMounted) {
            setProduct(null);
            setNotFound(true);
          }
          return;
        }
        const currentProduct = normalizeProduct(rawProduct);
        if (isMounted) {
          setProduct(currentProduct);
        }

        if (currentProduct?.category?._id) {
          const relatedResponse = await API.get(
            `/products?category=${currentProduct.category._id}`
          );
          const relatedProducts = normalizeProductList(
            relatedResponse.data?.data?.products || []
          );
          if (isMounted) {
            setRelated(relatedProducts.filter((item) => item._id !== id));
          }
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setProduct(null);
          setNotFound(true);
        }
      } finally {
        if (isMounted) {
          setDetailLoading(false);
        }
      }
    }

    fetchProductData();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (detailLoading) return <Loading variant="detail" />;

  if (notFound || !product) {
    return (
      <div className="container py-5 text-center fade-in">
        <div className="attirex-card p-5 mx-auto" style={{ maxWidth: "520px" }}>
          <div className="fs-1 mb-3">🛍️</div>
          <h3
            className="fw-bold mb-2 text-body"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Product Not Found
          </h3>
          <p className="text-muted small mb-4">
            We couldn't find the product you're looking for. It may have been removed or updated.
          </p>
          <button
            type="button"
            className="attirex-btn-primary mx-auto"
            style={{ maxWidth: "220px" }}
            onClick={() => navigate("/products")}
          >
            Explore Products
          </button>
        </div>
      </div>
    );
  }

  const isElectronics =
    (product.category?.name || "").toLowerCase() === "electronics";
  const originalPrice = product.price + Math.floor(product.price * 0.4);
  const wishlistEntry =
    isAuthenticated &&
    (wishlist || []).find(
      (w) => w?.product?._id === product._id || w?._id === product._id
    );
  const isFavorite = Boolean(wishlistEntry);

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (!isElectronics && !selectedSize) {
      showPopup("Please select a size");
      return;
    }
    await addToCart(product._id, qty, isElectronics ? "" : selectedSize);
  };

  const handleWishlistAction = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    if (isFavorite && wishlistEntry?._id) {
      removeFromWishlist(wishlistEntry._id);
    } else {
      addToWishlist(product._id);
    }
  };

  return (
    <>
      <div className="container py-5 fade-in">
        <div className="card border shadow-sm rounded-4 p-4 p-lg-5 mb-5">
          <div className="row g-5 align-items-start">
            {/* Left Column: Product Image */}
            <div className="col-lg-6">
              <div className="position-relative border rounded-3 overflow-hidden shadow-sm">
                <img
                  src={getProductImage(product)}
                  className="img-fluid w-100 object-fit-cover attirex-detail-img"
                  alt={product.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = getFallbackImage(product.title);
                  }}
                />
                {product.rating >= 4.5 && (
                  <span className="attirex-card-badge">Trending</span>
                )}
              </div>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="col-lg-6">
              <nav aria-label="breadcrumb" className="mb-2">
                <ol className="breadcrumb small text-uppercase tracking-wider text-muted mb-0">
                  <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none text-muted">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      to="/products"
                      className="text-decoration-none text-muted">
                      Products
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item active text-body fw-semibold"
                    aria-current="page">
                    {product.category?.name}
                  </li>
                </ol>
              </nav>

              <h1
                className="fw-bold mb-3 text-body"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2rem",
                }}>
                {product.title}
              </h1>

              <div className="mb-3 d-flex align-items-center gap-3">
                <span className="attirex-star-pill rating-badge px-3 py-1">
                  <span>{product.rating}</span>
                  <span className="star-symbol">★</span>
                </span>
                <span className="text-muted small">2.5k verified ratings</span>
              </div>

              <div className="mb-4 p-3 bg-body-tertiary rounded-3 border">
                <div className="d-flex align-items-baseline gap-3 mb-1">
                  <h2 className="fw-extrabold text-body mb-0">
                    ₹{(product.price || 0) * (qty || 1)}
                  </h2>
                  <span className="text-decoration-line-through text-muted fs-5">
                    ₹{originalPrice * (qty || 1)}
                  </span>
                  <span className="badge bg-danger text-white px-2 py-1 small">
                    {Math.round(
                      ((originalPrice - product.price) / originalPrice) * 100
                    )}
                    % OFF
                  </span>
                </div>
                <p className="text-success small fw-medium mb-0">
                  Inclusive of all applicable taxes
                </p>
              </div>

              {/* ATTIREX Trust Tags */}
              <div className="d-flex flex-column gap-2 mb-4 p-3 rounded-3 border bg-body-tertiary small fw-semibold text-body">
                <div className="d-flex align-items-center gap-2">
                  <span>🚚</span>
                  <span>Fastest Express Delivery Nationwide</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span>🏷️</span>
                  <span>Inclusive of All Taxes — Best Price Guaranteed</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span>✅</span>
                  <span>Cash On Delivery Available</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <span>↩️</span>
                  <span>10 Days Hassle-Free Return & Exchange</span>
                </div>
              </div>

              {/* Select Size */}
              {!isElectronics && (
                <div className="mb-4">
                  <h6 className="attirex-filter-heading mb-2">SELECT SIZE</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {["S", "M", "L", "XL", "XXL"].map((s) => (
                      <button
                        key={s}
                        type="button"
                        className={`btn rounded-2 d-flex align-items-center justify-content-center ${
                          selectedSize === s
                            ? "btn-primary"
                            : "btn-outline-secondary"
                        }`}
                        style={{
                          width: "48px",
                          height: "44px",
                          fontWeight: "700",
                        }}
                        onClick={() => setSelectedSize(s)}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity & Action Buttons */}
              <div className="mb-4">
                <h6 className="attirex-filter-heading mb-2">QUANTITY</h6>
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div className="btn-group border rounded-2 bg-body-tertiary">
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none px-3 text-body fw-bold"
                      disabled={qty <= 1}
                      onClick={() => setQty(qty - 1)}>
                      −
                    </button>
                    <span className="px-3 align-self-center fw-bold text-body">
                      {qty}
                    </span>
                    <button
                      type="button"
                      className="btn btn-link text-decoration-none px-3 text-body fw-bold"
                      onClick={() => setQty(qty + 1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-3">
                  <button
                    type="button"
                    className="attirex-btn-primary py-2"
                    onClick={handleAddToCart}>
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"></circle>
                      <circle cx="20" cy="21" r="1"></circle>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                    </svg>
                    <span>Add to Cart</span>
                  </button>

                  <button
                    type="button"
                    className="attirex-btn-outline py-2"
                    onClick={handleWishlistAction}>
                    <span>
                      {isFavorite ? "♥ In Wishlist" : "♡ Add to Wishlist"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Product Details Description */}
              <div className="card border rounded-3">
                <div className="card-body p-3">
                  <h6 className="attirex-filter-heading mb-2">
                    PRODUCT DETAILS
                  </h6>
                  <ul
                    className="mb-0 text-muted small ps-3"
                    style={{ lineHeight: "1.75" }}>
                    {product.description
                      ?.split(".")
                      .map((line, idx) =>
                        line.trim() ? (
                          <li key={idx} className="mb-1">
                            {line.trim()}.
                          </li>
                        ) : null
                      )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className="pt-3">
            <div className="mb-4">
              <h4
                className="fw-bold mb-1 text-body"
                style={{ fontFamily: "var(--font-serif)" }}>
                You May Also Like
              </h4>
              <p className="text-muted small mb-0">
                Curated recommendations from the {product.category?.name}{" "}
                collection
              </p>
            </div>
            <div className="row g-4">
              {related.slice(0, 4).map((item) => (
                <div key={item._id} className="col-12 col-sm-6 col-md-3">
                  <div
                    className="attirex-product-card"
                    onClick={() => navigate(`/products/${item._id}`)}>
                    <div
                      className="attirex-card-img-wrap"
                      style={{ height: "200px" }}>
                      <img
                        src={getProductImage(item)}
                        alt={item.title}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getFallbackImage(item.title);
                        }}
                      />
                    </div>
                    <div className="attirex-card-info">
                      <div className="attirex-card-header">
                        <h6
                          className="attirex-card-title"
                          style={{ fontSize: "0.92rem" }}>
                          {item.title}
                        </h6>
                        <span className="attirex-star-pill rating-badge">
                          <span>{item.rating}</span>
                          <span className="star-symbol">★</span>
                        </span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="attirex-price-current">
                          ₹{item.price}
                        </span>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary rounded-2 px-2 py-1 small fw-semibold"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (isAuthenticated) {
                              addToCart(item._id, 1, "M");
                            } else {
                              setShowAuthModal(true);
                            }
                          }}>
                          + Add to Cart
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
