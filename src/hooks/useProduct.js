import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";

export default function useProduct() {
  const { products, loading, categories, globalSearch, setGlobalSearch } =
    useAppFeatures();
  const [filtered, setFiltered] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");
  const [sortByRating, setSortByRating] = useState("");
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryCategoryId = searchParams.get("category");
    if (queryCategoryId) {
      setSelectedCats([queryCategoryId]);
    } else {
      setSelectedCats([]);
    }
    const sortParam = searchParams.get("sort");
    if (sortParam) setSort(sortParam);
    const minRating = searchParams.get("rating");
    if (minRating) setRating(Number(minRating));
  }, [location.search]);

  useEffect(() => {
    let res = [...products];
    if (selectedCats.length)
      res = res.filter((product) =>
        selectedCats.includes(String(product.category?._id)),
      );
    if (price) res = res.filter((product) => product.price <= price);
    if (rating) res = res.filter((product) => product.rating >= rating);
    if (sortByRating === 4)
      res = res.filter((product) => product.rating > sortByRating);
    if (globalSearch)
      res = res.filter((p) =>
        p.title.toLowerCase().includes(globalSearch.toLowerCase()),
      );
    if (sort === "low") res.sort((a, b) => a.price - b.price);
    if (sort === "high") res.sort((a, b) => b.price - a.price);
    setFiltered(res);
  }, [products, selectedCats, price, rating, sortByRating, sort, globalSearch]);

  const clearAll = () => {
    const categoryParam = new URLSearchParams(location.search).get("category");
    setSelectedCats(categoryParam ? [categoryParam] : []);
    setRating(0);
    setSort("");
    setPrice(5000);
    setSortByRating("");
    if (setGlobalSearch) setGlobalSearch("");
  };

  return {
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
    sort,
    setSort,
    clearAll,
    filtered,
  };
}
