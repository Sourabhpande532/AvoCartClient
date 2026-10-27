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
    <footer className="attirex-footer py-5 mt-auto">
      <div className="container">
        <div className="row g-4">
          {/* Brand & About */}
          <div className="col-lg-3 col-md-6">
            <h5 className="attirex-footer-heading d-flex align-items-center gap-2">
              <span>🥑</span> AVOCART
            </h5>
            <p
              className="small mb-3"
              style={{ color: "rgba(255, 255, 255, 0.78)", lineHeight: 1.7 }}
            >
              Specializes in providing high-quality, stylish fashion and curated
              lifestyle essentials for your wardrobe.
            </p>
            <div className="d-flex gap-2">
              <a
                href="https://github.com/Sourabhpande532"
                target="_blank"
                rel="noreferrer"
                className="attirex-social-icon"
                title="GitHub"
              >
                GH
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="attirex-social-icon"
                title="LinkedIn"
              >
                IN
              </a>
              <a
                href="mailto:sourabhpande43@gmail.com"
                className="attirex-social-icon"
                title="Email"
              >
                @
              </a>
            </div>
          </div>

          {/* Catalog Links */}
          <div className="col-6 col-lg-2 col-md-6">
            <h6 className="attirex-footer-heading">COMPANY</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <Link
                  to="/products"
                  onClick={scrollToTop}
                  className="attirex-footer-link"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to={
                    getCatId("Men")
                      ? `/products?category=${getCatId("Men")}`
                      : "/products"
                  }
                  onClick={scrollToTop}
                  className="attirex-footer-link"
                >
                  Men's Fashion
                </Link>
              </li>
              <li>
                <Link
                  to={
                    getCatId("Women")
                      ? `/products?category=${getCatId("Women")}`
                      : "/products"
                  }
                  onClick={scrollToTop}
                  className="attirex-footer-link"
                >
                  Women's Fashion
                </Link>
              </li>
              <li>
                <Link
                  to={
                    getCatId("Electronics")
                      ? `/products?category=${getCatId("Electronics")}`
                      : "/products"
                  }
                  onClick={scrollToTop}
                  className="attirex-footer-link"
                >
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Account & Support */}
          <div className="col-6 col-lg-3 col-md-6">
            <h6 className="attirex-footer-heading">ACCOUNT & SUPPORT</h6>
            <ul className="list-unstyled d-flex flex-column gap-2 mb-0">
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleSupportAction("View and manage your orders below.")
                  }
                  className="attirex-footer-link"
                >
                  My Orders
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleSupportAction(
                      "Select an order to initiate return or replacement."
                    )
                  }
                  className="attirex-footer-link"
                >
                  Order Returns
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() =>
                    handleSupportAction(
                      "Real-time order delivery updates in your profile."
                    )
                  }
                  className="attirex-footer-link"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleSupportAction()}
                  className="attirex-footer-link"
                >
                  Saved Addresses
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h6 className="attirex-footer-heading">CONTACT US & NEWSLETTER</h6>
            <p
              className="small mb-2"
              style={{ color: "rgba(255, 255, 255, 0.78)" }}
            >
              📍 211303 Look Book Street, New Delhi, India
              <br />
              📞 +91 123-456-7890 | ✉️ support@avocart.com
            </p>
            <div className="input-group mt-3">
              <input
                type="email"
                id="newsletter-email"
                className="form-control form-control-sm"
                placeholder="Enter your email..."
              />
              <button
                className="btn btn-sm px-3 fw-bold text-white"
                style={{ backgroundColor: "var(--light-blue)" }}
                type="button"
                onClick={() => {
                  const emailInput =
                    document.getElementById("newsletter-email");
                  const email = emailInput?.value || "";
                  if (email && email.includes("@")) {
                    pushAlert({
                      type: "success",
                      text: `Thank you for subscribing, ${email}!`,
                    });
                    emailInput.value = "";
                  } else {
                    pushAlert({
                      type: "error",
                      text: "Please enter a valid email.",
                    });
                  }
                }}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <hr
          className="my-4"
          style={{ borderColor: "rgba(255, 255, 255, 0.2)" }}
        />

        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p
            className="mb-0 small"
            style={{ color: "rgba(255, 255, 255, 0.75)" }}
          >
            © 2026 AvoCart Inc. All Rights Reserved.
          </p>
          <div className="d-flex gap-4 small">
            <button
              type="button"
              className="attirex-footer-link"
              onClick={() =>
                pushAlert({
                  type: "info",
                  text: "Privacy Policy: Customer data is protected with 256-bit encryption.",
                })
              }
            >
              Privacy Policy
            </button>
            <button
              type="button"
              className="attirex-footer-link"
              onClick={() =>
                pushAlert({
                  type: "info",
                  text: "Terms of Service: 10-day replacement and 100% authentic products guaranteed.",
                })
              }
            >
              Terms of Service
            </button>
            <button
              type="button"
              className="attirex-footer-link"
              onClick={() =>
                pushAlert({
                  type: "info",
                  text: "Cookie Settings: Essential session & cart cookies enabled.",
                })
              }
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
