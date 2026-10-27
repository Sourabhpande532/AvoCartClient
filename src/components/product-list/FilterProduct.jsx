import ProductCart from "../ProductCard";

export const FilteredProduct = ({ filtered, clearAll }) => {
  return (
    <div className="attirex-product-list">
      {filtered.length > 0 ? (
        filtered.map((p) => <ProductCart key={p._id} product={p} />)
      ) : (
        <div className="w-100 text-center py-5">
          <div className="fs-1 mb-3">🛍️</div>
          <h3
            className="fw-bold text-body"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            No matching products found
          </h3>
          <p className="text-muted">
            Try adjusting your price range, rating filter, or search keywords.
          </p>
          <button
            type="button"
            className="attirex-btn-primary mt-2 mx-auto"
            style={{ maxWidth: "220px" }}
            onClick={clearAll}
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
