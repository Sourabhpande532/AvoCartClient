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
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li><Link to="/products" className="text-decoration-none text-muted">All Products</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">Featured Items</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">New Arrivals</Link></li>
              <li><Link to="/products" className="text-decoration-none text-muted">Special Offers</Link></li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Account & Support</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2">
              <li>
                <button 
                  onClick={handleSupportAction} 
                  className="btn btn-link p-0 text-decoration-none text-muted text-start"
                >
                  Order Returns
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSupportAction} 
                  className="btn btn-link p-0 text-decoration-none text-muted text-start"
                >
                  Track Order
                </button>
              </li>
              <li>
                <button 
                  onClick={handleSupportAction} 
                  className="btn btn-link p-0 text-decoration-none text-muted text-start"
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
                if(email) {
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
            <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }}>Terms of Service</span>
            <span style={{ cursor: 'pointer' }}>Cookie Settings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
