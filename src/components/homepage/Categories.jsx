import { Link } from "react-router-dom";

export const Categories = ({ filteredCategory }) => {
  return (
    <>
      <div className='row g-4'>
        {Array.isArray(filteredCategory) && filteredCategory.length > 0 ? (
          filteredCategory.map((cat) => (
            <div key={cat._id} className='col-md-4'>
              <Link
                to={`/products?category=${cat._id}`}
                className='text-decoration-none text-dark'>
                <div className='card h-100 border-0 shadow-sm overflow-hidden'>
                  <div className='overflow-hidden' style={{ height: "240px" }}>
                    <img
                      src={
                        cat.image
                          ? cat.image
                          : `https://placehold.co/400x300/6366f1/ffffff?text=${encodeURIComponent(cat.name)}`
                      }
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
                      {cat.description ||
                        "Explore our latest collection of premium " + cat.name}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className='col-12 text-center py-5'>
            <div className='fs-1 mb-3'>🔍</div>
            <h3 className='fw-bold'>No categories found</h3>
            <p className='text-muted'>Try searching for something else</p>
          </div>
        )}
      </div>
    </>
  );
};

export const FeaturedCategory = () => {
  return (
    <>
      <div className='d-flex justify-content-between align-items-end mb-4'>
        <div>
          <h2 className='h2 mb-1 fw-bold'>Featured Categories</h2>
          <p className='text-muted'>
            Shop by your favorite style or department
          </p>
        </div>
        <Link
          to='/products'
          className='btn btn-link text-decoration-none fw-semibold'>
          View All →
        </Link>
      </div>
    </>
  );
};
