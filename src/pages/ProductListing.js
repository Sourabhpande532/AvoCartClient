/* eslint-disable react-hooks/exhaustive-deps */
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCart from "../components/ProductCard";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState } from "react";
import useQuery from "../hooks/useQuery";

export const ProductListing = () => {
  const { products, loading, categories, globalSearch, setGlobalSearch } =
    useAppFeatures();
  const [filtered, setFiltered] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [price, setPrice] = useState(300);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");
  const [sortByRating, setSortByRating] = useState("");
  const query = useQuery();

  useEffect(() => {
    const queryCategoryId = query.get("category");
    if (queryCategoryId) setSelectedCats([queryCategoryId]);
  }, []);

  useEffect(() => {
    setGlobalSearch("");
  }, []);

  useEffect(() => {
    let res = [...products];
    if (selectedCats.length)
      res = res.filter((product) =>
        selectedCats.includes(String(product.category?._id))
      );
    if (price) res = res.filter((product) => product.price > price);
    if (rating) res = res.filter((product) => product.rating >= rating);
    if (sortByRating === 4)
      res = res.filter((product) => product.rating > sortByRating);
    if (globalSearch)
      res = res.filter((p) =>
        p.title.toLowerCase().includes(globalSearch.toLowerCase())
      );
    if (sort === "low") res.sort((a, b) => a.price - b.price);
    if (sort === "high") res.sort((a, b) => b.price - a.price);
    setFiltered(res);
  }, [products, selectedCats, price, rating, sortByRating, sort, globalSearch]);

  const clearAll = () => {
    setSelectedCats([query.get("category")]);
    setRating(0);
    setSort("");
    setPrice(300);
    setSortByRating("");
  };
  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className='container-fluid px-4 py-4 fade-in'>
      <div className='row g-4'>
        <div className='col-lg-3'>
          <div className="sticky-top scrollable-sidebar" style={{ top: '100px' }}>
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
          <div className='mb-4 d-flex justify-content-between align-items-center'>
            <div>
              <h2 className="fw-bold mb-0">Products</h2>
              <p className="text-muted mb-0">Showing {filtered.length} results</p>
            </div>
            <div className="d-flex gap-2">
              <select 
                className="form-select form-select-sm border-0 shadow-sm" 
                value={sort} 
                onChange={(e) => setSort(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="">Sort by Price</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
              </select>
            </div>
          </div>
          <div className='row g-4'>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <div key={p._id} className='col-sm-6 col-md-4'>
                  <ProductCart product={p} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center py-5">
                <div className="fs-1 mb-3">🛍️</div>
                <h3 className="fw-bold">No products found</h3>
                <p className="text-muted">Try adjusting your filters or search terms</p>
                <button className="btn btn-outline-primary mt-3" onClick={clearAll}>Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
