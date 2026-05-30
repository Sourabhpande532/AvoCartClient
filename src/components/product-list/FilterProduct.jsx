import ProductCart from "../ProductCard";
export const FilteredProduct = ({ filtered, clearAll }) => {
  return (
    <>
      <div className='row g-4'>
        {filtered.length > 0 ? (
          filtered.map((p) => (
            <div key={p._id} className='col-sm-6 col-md-4'>
              <ProductCart product={p} />
            </div>
          ))
        ) : (
          <div className='col-12 text-center py-5'>
            <div className='fs-1 mb-3'>🛍️</div>
            <h3 className='fw-bold'>No products found</h3>
            <p className='text-muted'>
              Try adjusting your filters or search terms
            </p>
            <button className='btn btn-outline-primary mt-3' onClick={clearAll}>
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </>
  );
};