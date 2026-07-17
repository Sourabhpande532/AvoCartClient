import { useEffect, useState } from "react";
import { useAppFeatures } from "../contexts/AppContext";
import useQuery from "../hooks/useQuery";

export default function useProduct() {
  const { products, loading, categories, globalSearch, setGlobalSearch } =
    useAppFeatures();
  const [filtered, setFiltered] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");
  const [sortByRating, setSortByRating] = useState("");
  const query = useQuery();

  useEffect(() => {
    const queryCategoryId = query.get("category");
    if (queryCategoryId) setSelectedCats([queryCategoryId]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setGlobalSearch("");
  }, [setGlobalSearch]);

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
    setSelectedCats([query.get("category")]);
    setRating(0);
    setSort("");
    setPrice(5000);
    setSortByRating("");
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
