/* eslint-disable no-lone-blocks */
import { Link } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";

export const Home = () => {
  const { categories, loading, globalSearch } = useAppFeatures();
  const filteredCategory = (categories || []).filter((category) =>
    (category?.name || "")
      .toLowerCase()
      .includes((globalSearch || "").toLowerCase()),
  );
  if (loading) return <p className='text-center'>Loading...</p>;
  return (
    <div className='container my-5 fade-in'>
      {/* Hero Section */}
      <div className="row align-items-center mb-5 py-5 bg-primary-subtle rounded-4 px-4 overflow-hidden position-relative">
        <div className="col-lg-6 position-relative z-1">
          <h1 className="display-3 fw-bold mb-3">Discover Your Next <span className="text-primary">Favorite</span> Piece</h1>
          <p className="lead mb-4 opacity-75">Explore our curated collection of premium products designed for modern life. Quality meets style in every category.</p>
          <Link to="/products" className="btn btn-primary btn-lg px-4 py-2">Shop Now</Link>
        </div>
        <div className="col-lg-6 d-none d-lg-block position-relative">
           <div className="bg-primary rounded-circle position-absolute" style={{ width: '400px', height: '400px', top: '-100px', right: '-100px', opacity: '0.1' }}></div>
           <img src="https://placehold.co/600x400/6366f1/ffffff?text=Modern+Shopping" alt="Hero" className="img-fluid rounded-4 shadow-lg position-relative z-1" />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className='h2 mb-1 fw-bold'>Featured Categories</h2>
          <p className="text-muted">Shop by your favorite style or department</p>
        </div>
        <Link to="/products" className="btn btn-link text-decoration-none fw-semibold">View All →</Link>
      </div>

      <div className='row g-4'>
        {Array.isArray(filteredCategory) && filteredCategory.length > 0 ? (
          filteredCategory.map((cat) => (
            <div key={cat._id} className='col-md-4'>
              <Link
                to={`/products?category=${cat._id}`}
                className='text-decoration-none text-dark'>
                <div className='card h-100 border-0 shadow-sm overflow-hidden'>
                  <div className="overflow-hidden" style={{ height: "240px" }}>
                    <img
                      src={cat.image ? cat.image : `https://placehold.co/400x300/6366f1/ffffff?text=${encodeURIComponent(cat.name)}`}
                      className='w-100 h-100 object-fit-cover hover-scale'
                      alt={cat.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/400x300/6366f1/ffffff?text=${encodeURIComponent(cat.name)}`;
                      }}
                    />
                  </div>
                  <div className='card-body p-4'>
                    <h5 className='fw-bold mb-2'>{cat.name}</h5>
                    <p className='text-muted small mb-0'>
                      {cat.description || "Explore our latest collection of premium " + cat.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="fs-1 mb-3">🔍</div>
            <h3 className="fw-bold">No categories found</h3>
            <p className="text-muted">Try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};
