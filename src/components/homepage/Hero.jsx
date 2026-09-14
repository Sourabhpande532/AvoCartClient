import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className='row align-items-center mb-5 py-5 px-4 px-md-5 rounded-4 border bg-body-tertiary shadow-sm overflow-hidden position-relative'>
      <div className='col-lg-6 position-relative z-1 py-3'>
        <span className="badge bg-primary-subtle text-primary border border-primary-subtle px-3 py-2 rounded-pill fw-semibold mb-3 small">
          New Collection 2026
        </span>
        <h1 className='display-4 fw-extrabold mb-3 tracking-tight'>
          Elevate Your Daily <span className='text-primary'>Essentials</span>
        </h1>
        <p className='lead mb-4 text-muted fs-6' style={{ maxWidth: '480px' }}>
          Discover our meticulously crafted selection of premium goods. Designed with purpose, built for endurance, and styled for modern life.
        </p>
        <div className="d-flex flex-wrap gap-3">
          <Link to='/products' className='btn btn-primary btn-lg px-4 py-2 rounded-3 shadow-sm fs-6 fw-semibold'>
            Explore Catalog →
          </Link>
          <a href='#categories' className='btn btn-outline-secondary btn-lg px-4 py-2 rounded-3 fs-6 fw-semibold'>
            View Categories
          </a>
        </div>
      </div>
      <div className='col-lg-6 d-none d-lg-block position-relative'>
        <div className="position-relative rounded-4 overflow-hidden shadow">
          <img
            src='https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop'
            alt='Curated Lifestyle Collection'
            className='img-fluid w-100 object-fit-cover'
            style={{ height: '360px' }}
          />
        </div>
      </div>
    </div>
  );
};