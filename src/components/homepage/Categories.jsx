import { Link } from "react-router-dom";
import { getFallbackImage } from "../../utils/fallbackImage";

export const Categories = ({ filteredCategory }) => {
  return (
    <div className='row g-4'>
      {Array.isArray(filteredCategory) && filteredCategory.length > 0 ? (
        filteredCategory.map((cat) => (
          <div key={cat._id} className='col-md-4'>
            <Link
              to={`/products?category=${cat._id}`}
              className='text-decoration-none text-body'>
              <div className='card h-100 border shadow-sm overflow-hidden hover-scale'>
                <div className='overflow-hidden bg-body-secondary' style={{ height: "220px" }}>
                  <img
                    src={
                      cat.image
                        ? cat.image
                        : getFallbackImage(cat.name)
                    }
                    className='w-100 h-100 object-fit-cover'
                    alt={cat.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getFallbackImage(cat.name);
                    }}
                  />
                </div>
                <div className='card-body p-4 d-flex flex-column'>
                  <h5 className='fw-bold mb-2'>{cat.name}</h5>
                  <p className='text-muted small mb-0 flex-grow-1'>
                    {cat.description ||
                      "Explore our latest collection of premium " + cat.name}
                  </p>
                  <div className="mt-3 text-primary fw-semibold small d-flex align-items-center gap-1">
                    <span>Shop category</span>
                    <span>→</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <div className='col-12 text-center py-5'>
          <div className='fs-1 mb-3 text-muted'>🔍</div>
          <h4 className='fw-bold mb-2'>No categories found</h4>
          <p className='text-muted small'>Try adjusting your search keywords</p>
        </div>
      )}
    </div>
  );
};

export const FeaturedCategory = () => {
  return (
    <div id="categories" className='d-flex justify-content-between align-items-end mb-4 pt-2'>
      <div>
        <h3 className='h3 mb-1 fw-bold tracking-tight'>Featured Categories</h3>
        <p className='text-muted mb-0 small'>
          Explore curated departments tailored to your needs
        </p>
      </div>
      <Link
        to='/products'
        className='btn btn-link text-decoration-none fw-semibold text-primary p-0'>
        Browse All Products →
      </Link>
    </div>
  );
};
