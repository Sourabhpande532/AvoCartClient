import { Link, useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import { useAuth } from "../contexts/AuthContext";

const Footer = () => {
  const { pushAlert } = useAppFeatures();
  const { isAuthenticated, setShowAuthModal } = useAuth();
  const navigate = useNavigate();

  const handleSupportAction = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      setShowAuthModal(true);
    }
  };

  return (
    <footer className="footer py-5 mt-auto border-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3 text-primary">AvoCart</h5>
            <p className="text-muted small">
              Elevating your lifestyle with curated premium products. Quality meets style in every piece we offer.
            </p>
            <div className="d-flex gap-3 fs-5">
              <span>🐦</span>
              <span>📸</span>
              <span>📘</span>
            </div>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-uppercase small">Shop</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-muted">
              <li><Link to="/products" className="text-decoration-none text-muted">All Products</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">Featured</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">New Arrivals</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">Offers</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-uppercase small">Support</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-muted">
              <li>
                <button 
                  onClick={handleSupportAction} 
                  className="btn btn-link p-0 text-decoration-none text-muted"
                >
                  Returns
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSupportAction} 
                  className="btn btn-link p-0 text-decoration-none text-muted"
                >
                  Shipping
                </button>
              </li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3 text-uppercase small">Newsletter</h6>
            <p className="text-muted small">Stay updated with our latest collections and exclusive offers.</p>
            <div className="input-group mb-3">
              <input type="email" id="newsletter-email" className="form-control" placeholder="your@email.com" />
              <button className="btn btn-primary" type="button" onClick={() => {
                const email = document.getElementById('newsletter-email').value;
                if(email) {
                  pushAlert({ type: "success", text: `Thank you for subscribing, ${email}!` });
                  document.getElementById('newsletter-email').value = "";
                } else {
                  pushAlert({ type: "error", text: "Please enter a valid email." });
                }
              }}>Join</button>
            </div>
          </div>
        </div>
        <hr className="my-4 opacity-25" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="mb-0 text-muted small">© 2026 AvoCart. All Rights Reserved.</p>
          <div className="d-flex gap-4 small text-muted">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
