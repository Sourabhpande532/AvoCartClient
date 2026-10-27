import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";
import {
  COLLECTION_TILES,
  matchesSubCategory,
  getProductImage,
} from "../utils/fallbackImage";

export default function useProduct() {
  const { products, loading, categories, globalSearch, setGlobalSearch } =
    useAppFeatures();
  const [filtered, setFiltered] = useState([]);
  const [selectedCats, setSelectedCats] = useState([]);
  const [selectedSubCats, setSelectedSubCats] = useState([]);
  const [price, setPrice] = useState(5000);
  const [rating, setRating] = useState(0);
  const [sort, setSort] = useState("");
  const [sortByRating, setSortByRating] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const queryCategoryId = searchParams.get("category");
    if (queryCategoryId) {
      setSelectedCats([queryCategoryId]);
    } else {
      setSelectedCats([]);
    }

    const querySubCat = searchParams.get("sub");
    if (querySubCat) {
      setSelectedSubCats([querySubCat]);
    } else {
      setSelectedSubCats([]);
    }

    const sortParam = searchParams.get("sort");
    if (sortParam) setSort(sortParam);
    const minRating = searchParams.get("rating");
    if (minRating) setRating(Number(minRating));
  }, [location.search]);

  useEffect(() => {
    let res = [...products];

    // 1. Filter by SECTION (MongoDB Category IDs)
    if (selectedCats.length > 0) {
      res = res.filter((product) =>
        selectedCats.includes(String(product.category?._id))
      );
    }

    // 2. Filter by CATEGORIES (Sub-categories from Homepage Collection Tiles & Sidebar)
    if (selectedSubCats.length > 0) {
      res = res.filter((product) =>
        selectedSubCats.some((sub) => matchesSubCategory(product, sub))
      );

      // Put the product whose image matches the selected Homepage tile first!
      const primaryTile = COLLECTION_TILES.find((t) =>
        selectedSubCats.includes(t.subCategory)
      );
      if (primaryTile && !sort) {
        res.sort((a, b) => {
          const aMatch =
            getProductImage(a) === primaryTile.image ||
            (a.title || "")
              .toLowerCase()
              .includes(primaryTile.featuredProductTitle.toLowerCase());
          const bMatch =
            getProductImage(b) === primaryTile.image ||
            (b.title || "")
              .toLowerCase()
              .includes(primaryTile.featuredProductTitle.toLowerCase());
          if (aMatch && !bMatch) return -1;
          if (!aMatch && bMatch) return 1;
          return 0;
        });
      }
    }

    // 3. Filter by Price Slider
    if (price) res = res.filter((product) => product.price <= price);

    // 4. Filter by Rating
    if (rating) res = res.filter((product) => product.rating >= rating);
    if (sortByRating) {
      res = res.filter((product) => product.rating >= Number(sortByRating));
    }

    // 5. Filter by Global Search
    if (globalSearch) {
      res = res.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(globalSearch.toLowerCase()) ||
          (p.description || "")
            .toLowerCase()
            .includes(globalSearch.toLowerCase())
      );
    }

    // 6. Sort Products
    if (sort === "low") res.sort((a, b) => a.price - b.price);
    if (sort === "high") res.sort((a, b) => b.price - a.price);
    if (sort === "aToz")
      res.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    if (sort === "zToa")
      res.sort((a, b) => (b.title || "").localeCompare(a.title || ""));

    setFiltered(res);
  }, [
    products,
    selectedCats,
    selectedSubCats,
    price,
    rating,
    sortByRating,
    sort,
    globalSearch,
  ]);

  const clearAll = () => {
    setSelectedCats([]);
    setSelectedSubCats([]);
    setRating(0);
    setSort("");
    setPrice(5000);
    setSortByRating("");
    if (setGlobalSearch) setGlobalSearch("");
    if (location.search) {
      navigate("/products", { replace: true });
    }
  };

  return {
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
    sort,
    setSort,
    clearAll,
    filtered,
  };
}
