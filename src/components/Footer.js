const Footer = () => {
  return (
    <footer className="footer py-5 mt-auto border-top">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3 text-primary">MyStore</h5>
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
              <li>All Products</li>
              <li>Featured</li>
              <li>New Arrivals</li>
              <li>Offers</li>
            </ul>
          </div>
          <div className="col-6 col-lg-2">
            <h6 className="fw-bold mb-3 text-uppercase small">Support</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2 text-muted">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Returns</li>
              <li>Shipping</li>
            </ul>
          </div>
          <div className="col-lg-4">
            <h6 className="fw-bold mb-3 text-uppercase small">Newsletter</h6>
            <p className="text-muted small">Stay updated with our latest collections and exclusive offers.</p>
            <div className="input-group mb-3">
              <input type="text" className="form-control" placeholder="your@email.com" />
              <button className="btn btn-primary" type="button">Join</button>
            </div>
          </div>
        </div>
        <hr className="my-4 opacity-25" />
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
          <p className="mb-0 text-muted small">© 2026 MyStore. All Rights Reserved.</p>
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
