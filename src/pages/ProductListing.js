/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCart from "../components/ProductCard";
import { useAppFeatures } from "../contexts/AppContext";
import { useEffect, useState } from "react";
function useQuery() {
  return new URLSearchParams(useLocation().search);
}
export const ProductListing = () => {
  const { products, loading, categories, globalSearch, setGlobalSearch } =
    useAppFeatures();
  const [filtered, setFiltered] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [price, setPrice] = useState(300);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");
  const [rat, setRat] = useState("");
  const query = useQuery();

  useEffect(() => {
    const queryCategory = query.get("categorysent");
    if (queryCategory) setSelectedCats([queryCategory]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    if (rat === 4) res = res.filter((product) => product.rating > rat);
    if (globalSearch)
      res = res.filter((p) =>
        p.title.toLowerCase().includes(globalSearch.toLowerCase())
      );
    if (sort === "low") res.sort((a, b) => a.price - b.price);
    if (sort === "high") res.sort((a, b) => b.price - a.price);
    setFiltered(res);
  }, [products, selectedCats, price, rating, rat, sort, globalSearch]);

  const clearAll = () => {
    setSelectedCats([query.get("categorysent")]);
    setRating(0);
    setSort("");
    setPrice(300);
    setRat("");
  };
  if (loading) return <p className='text-center'>Loading...</p>;

  return (
    <div className='row'>
      <div className='col-md-3'>
        <FiltersSidebar
          categories={categories}
          selectedCats={selectedCats}
          setSelectedCats={setSelectedCats}
          price={price}
          setPrice={setPrice}
          rating={rating}
          setRating={setRating}
          rat={rat}
          setRat={setRat}
          sort={sort}
          setSort={setSort}
          clearAll={clearAll}
        />
      </div>
      <div className='col-md-9'>
        <div className='mb-3 d-flex justify-content-between'>
          <h4>Products ({filtered.length})</h4>
        </div>
        <div className='row'>
          {filtered.map((p) => (
            <div key={p._id} className='col-md-4 mb-3'>
              <ProductCart product={p} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
