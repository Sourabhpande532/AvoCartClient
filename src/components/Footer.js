import { Link, useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";

const Footer = () => {
  const { pushAlert, categories } = useAppFeatures();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleSupportAction = (message) => {
    if (isAuthenticated) {
      navigate("/profile");
      if (message) pushAlert({ type: "info", text: message });
    } else {
      setShowAuthModal(true);
    }
  };

  const getCatId = (name) => {
    const found = (categories || []).find(
      (c) => c.name?.toLowerCase() === name.toLowerCase()
    );
    return found ? found._id : "";
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer py-5 mt-auto border-top bg-body-tertiary">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
              <span>🥑</span> AvoCart
            </h5>
            <p className="text-muted small pe-lg-4">
              Curated premium products designed for modern living. Uncompromising quality and timeless style delivered to your doorstep.
            </p>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Catalog</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <Link
                  to="/products"
                  onClick={scrollToTop}
                  className="text-decoration-none text-muted"
                  style={{ fontSize: "0.875rem" }}
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to={getCatId("Electronics") ? `/products?category=${getCatId("Electronics")}` : "/products"}
                  onClick={scrollToTop}
                  className="text-decoration-none text-muted"
                  style={{ fontSize: "0.875rem" }}
                >
                  Electronics
                </Link>
              </li>
              <li>
                <Link
                  to={getCatId("Men") ? `/products?category=${getCatId("Men")}` : "/products"}
                  onClick={scrollToTop}
                  className="text-decoration-none text-muted"
                  style={{ fontSize: "0.875rem" }}
                >
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link
                  to={getCatId("Women") ? `/products?category=${getCatId("Women")}` : "/products"}
                  onClick={scrollToTop}
                  className="text-decoration-none text-muted"
                  style={{ fontSize: "0.875rem" }}
                >
                  Women's Fashion
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Account & Support</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportAction("View and manage your orders below.")}
                  className="btn btn-link p-0 text-decoration-none text-muted text-start shadow-none"
                  style={{ fontSize: "0.875rem" }}
                >
                  My Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportAction("Select an order to initiate return or replacement.")}
                  className="btn btn-link p-0 text-decoration-none text-muted text-start shadow-none"
                  style={{ fontSize: "0.875rem" }}
                >
                  Order Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportAction("Real-time order delivery updates in your profile.")}
                  className="btn btn-link p-0 text-decoration-none text-muted text-start shadow-none"
                  style={{ fontSize: "0.875rem" }}
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportAction()}
                  className="btn btn-link p-0 text-decoration-none text-muted text-start shadow-none"
                  style={{ fontSize: "0.875rem" }}
                >
                  Saved Addresses
                </button>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Newsletter</h6>
            <p className="text-muted small">Subscribe for early access to releases and member-only promotions.</p>
            <div className="input-group mb-3">
              <input type="email" id="newsletter-email" className="form-control" placeholder="enter your email..." />
              <button className="btn btn-primary px-3" type="button" onClick={() => {
                const email = document.getElementById('newsletter-email').value;
                if(email && email.includes("@")) {
                  pushAlert({ type: "success", text: `Thank you for subscribing, ${email}!` });
                  document.getElementById('newsletter-email').value = "";
                } else {
                  pushAlert({ type: "error", text: "Please enter a valid email." });
                }
              }}>Subscribe</button>
            </div>
          </div>
        </div>
        <hr className="my-4 opacity-25" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="mb-0 text-muted small">© 2026 AvoCart Inc. All Rights Reserved.</p>
          <div className="d-flex gap-4 small text-muted">
            <button
              type="button"
              className="btn btn-link p-0 text-muted small text-decoration-none shadow-none"
              onClick={() => pushAlert({ type: "info", text: "Privacy Policy: Customer data is protected with 256-bit encryption." })}
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="btn btn-link p-0 text-muted small text-decoration-none shadow-none"
              onClick={() => pushAlert({ type: "info", text: "Terms of Service: 10-day replacement and 100% authentic products guaranteed." })}
            >
              Terms of Service
            </button>
            <button
              type="button"
              className="btn btn-link p-0 text-muted small text-decoration-none shadow-none"
              onClick={() => pushAlert({ type: "info", text: "Cookie Settings: Essential session & cart cookies enabled." })}
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
