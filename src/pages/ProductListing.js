/* eslint-disable react-hooks/exhaustive-deps */
import FiltersSidebar from "../components/FiltersSidebar";
import { FilteredProduct, ProductStatus } from "../components/product-list";
import useProduct from "../hooks/useProduct";

export const ProductListing = () => {
  const {
    loading,
    categories,
    selectedCats,
    setSelectedCats,
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

  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <>
      <div className='container-fluid px-4 py-4 fade-in'>
        {/* Mobile Filter Toggle */}
        <div className="d-lg-none mb-4 d-flex align-items-center">
          <button 
            className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4 shadow-sm" 
            type="button" 
            data-bs-toggle="offcanvas" 
            data-bs-target="#mobileFiltersOffcanvas"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
            <span className="fw-bold">Filters</span>
          </button>
        </div>

        <div className='row g-4'>
          {/* Desktop Sidebar */}
          <div className='col-lg-3 d-none d-lg-block'>
            <div
              className='sticky-top scrollable-sidebar'
              style={{ top: "100px" }}>
              <FiltersSidebar
                idPrefix="desktop-"
                categories={categories}
              selectedCats={selectedCats}
              setSelectedCats={setSelectedCats}
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
        <div className='col-lg-9'>
          <ProductStatus filtered={filtered} sort={sort} setSort={setSort} />
          <FilteredProduct filtered={filtered} clearAll={clearAll} />
        </div>
      </div>
    </div>

      {/* Mobile Offcanvas Filters */}
      <div className="offcanvas offcanvas-start border-0 shadow" tabIndex="-1" id="mobileFiltersOffcanvas" style={{ maxWidth: '85vw' }}>
        <div className="offcanvas-body p-0 position-relative">
          <button 
            type="button" 
            className="btn-close position-absolute top-0 end-0 m-4 z-3" 
            data-bs-dismiss="offcanvas" 
            aria-label="Close"
          ></button>
          <div className="h-100 overflow-y-auto">
            <FiltersSidebar
              idPrefix="mobile-"
              categories={categories}
              selectedCats={selectedCats}
              setSelectedCats={setSelectedCats}
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
