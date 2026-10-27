import FiltersSidebar from "../components/FiltersSidebar";
import { FilteredProduct } from "../components/product-list";
import useProduct from "../hooks/useProduct";

export const ProductListing = () => {
  const {
    loading,
    categories,
    selectedCats,
    setSelectedCats,
    selectedSubCats,
    setSelectedSubCats,
    price,
    setPrice,
    rating,
    setRating,
    sortByRating,
    setSortByRating,
    clearAll,
    sort,
    setSort,
    filtered,
  } = useProduct();

  if (loading)
    return <p className="text-center py-5 text-muted">Loading products...</p>;

  return (
    <>
      <div className="attirex-product-page fade-in">
        {/* Mobile Filter Bar */}
        <div className="d-lg-none px-3 pt-3 pb-2 d-flex justify-content-between align-items-center border-bottom">
          <button
            className="btn btn-sm attirex-btn-outline w-auto px-3 py-2 d-flex align-items-center gap-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileFiltersOffcanvas"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span>FILTERS</span>
          </button>
          <button
            type="button"
            className="attirex-clear-btn"
            onClick={clearAll}
          >
            CLEAR
          </button>
        </div>

        <div className="attirex-product-section">
          {/* Desktop Sidebar (Matches ATTIREX left sidebar layout) */}
          <div className="attirex-sidebar-col d-none d-lg-block">
            <FiltersSidebar
              idPrefix="desktop-"
              categories={categories}
              selectedCats={selectedCats}
              setSelectedCats={setSelectedCats}
              selectedSubCats={selectedSubCats}
              setSelectedSubCats={setSelectedSubCats}
              price={price}
              setPrice={setPrice}
              rating={rating}
              setRating={setRating}
              sortByRating={sortByRating}
              setSortByRating={setSortByRating}
              sort={sort}
              setSort={setSort}
              clearAll={clearAll}
            />
          </div>

          {/* Product Grid Column */}
          <div className="attirex-products-col">
            <FilteredProduct filtered={filtered} clearAll={clearAll} />
          </div>
        </div>
      </div>

      {/* Mobile Offcanvas Filters */}
      <div
        className="offcanvas offcanvas-start border-0 shadow"
        tabIndex="-1"
        id="mobileFiltersOffcanvas"
        style={{ maxWidth: "85vw" }}
      >
        <div className="offcanvas-body p-3 position-relative">
          <div className="h-100 overflow-y-auto">
            <FiltersSidebar
              idPrefix="mobile-"
              categories={categories}
              selectedCats={selectedCats}
              setSelectedCats={setSelectedCats}
              selectedSubCats={selectedSubCats}
              setSelectedSubCats={setSelectedSubCats}
              price={price}
              setPrice={setPrice}
              rating={rating}
              setRating={setRating}
              sortByRating={sortByRating}
              setSortByRating={setSortByRating}
              sort={sort}
              setSort={setSort}
              clearAll={clearAll}
            />
          </div>
        </div>
      </div>
    </>
  );
};
