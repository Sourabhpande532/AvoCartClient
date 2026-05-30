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
    <div className='container-fluid px-4 py-4 fade-in'>
      <div className='row g-4'>
        <div className='col-lg-3'>
          <div
            className='sticky-top scrollable-sidebar'
            style={{ top: "100px" }}>
            <FiltersSidebar
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
  );
};
