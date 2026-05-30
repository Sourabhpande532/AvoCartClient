export const ProductStatus = ({ filtered, sort, setSort }) => {
  return (
    <>
      <div className='mb-4 d-flex justify-content-between align-items-center'>
        <div>
          <h2 className='fw-bold mb-0'>Products</h2>
          <p className='text-muted mb-0'>Showing {filtered.length} results</p>
        </div>
        <div className='d-flex gap-2'>
          <select
            className='form-select form-select-sm border-0 shadow-sm'
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{ width: "auto" }}>
            <option value=''>Sort by Price</option>
            <option value='low'>Price: Low to High</option>
            <option value='high'>Price: High to Low</option>
          </select>
        </div>
      </div>
    </>
  );
};
