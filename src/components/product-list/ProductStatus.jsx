export const ProductStatus = ({ filtered, sort, setSort }) => {
  return (
    <div className="mb-4 d-flex flex-wrap justify-content-between align-items-center gap-2 pb-2 border-bottom">
      <div>
        <h2
          className="fw-bold mb-0 text-body"
          style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem" }}>
          All Products
        </h2>
        <p className="text-muted small mb-0">
          Showing <strong>{filtered.length}</strong> products
        </p>
      </div>
      <div className="d-flex align-items-center gap-2">
        <select
          className="form-select form-select-sm shadow-sm"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          style={{ width: "auto", minWidth: "175px" }}
          aria-label="Sort products">
          <option value="">Sort by: Featured</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
          <option value="aToz">Name: A to Z</option>
          <option value="zToa">Name: Z to A</option>
        </select>
      </div>
    </div>
  );
};
