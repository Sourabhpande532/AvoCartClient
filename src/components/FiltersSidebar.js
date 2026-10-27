import { SUB_CATEGORY_OPTIONS } from "../utils/fallbackImage";

export default function FiltersSidebar({
  categories = [],
  selectedCats = [],
  setSelectedCats,
  selectedSubCats = [],
  setSelectedSubCats,
  rating,
  setRating,
  sortByRating,
  setSortByRating,
  sort,
  setSort,
  clearAll,
  price,
  setPrice,
  idPrefix = "",
}) {
  const toggleSectionChange = (categoryId) => {
    const alreadySelected = selectedCats.includes(categoryId);
    if (alreadySelected) {
      setSelectedCats(selectedCats.filter((id) => id !== categoryId));
    } else {
      setSelectedCats([...selectedCats, categoryId]);
    }
  };

  const toggleSubCategoryChange = (subName) => {
    if (!setSelectedSubCats) return;
    const alreadySelected = selectedSubCats.includes(subName);
    if (alreadySelected) {
      setSelectedSubCats(selectedSubCats.filter((s) => s !== subName));
    } else {
      setSelectedSubCats([...selectedSubCats, subName]);
    }
  };

  const handleRatingToggle = (starVal) => {
    if (Number(sortByRating) === starVal) {
      setSortByRating("");
      if (setRating) setRating(0);
    } else {
      setSortByRating(starVal);
      if (setRating) setRating(starVal);
    }
  };

  const formatSectionLabel = (name = "") => {
    const lower = name.toLowerCase();
    if (lower === "women") return "Women's";
    if (lower === "men") return "Men's";
    if (lower === "kids") return "Kid's";
    return name;
  };

  // Sort sections so Women's, Men's, Kid's appear first just like ATTIREX
  const orderedCategories = [...categories].sort((a, b) => {
    const order = { women: 1, men: 2, kids: 3, home: 4, electronics: 5 };
    const aOrder = order[(a.name || "").toLowerCase()] || 99;
    const bOrder = order[(b.name || "").toLowerCase()] || 99;
    return aOrder - bOrder;
  });

  return (
    <aside className="attirex-filters-sidebar">
      {/* Header: FILTERS & CLEAR */}
      <div className="attirex-filter-header">
        <span className="attirex-filter-title">FILTERS</span>
        <div className="d-flex align-items-center gap-3">
          <button
            type="button"
            className="attirex-clear-btn"
            onClick={clearAll}
          >
            CLEAR
          </button>
          {idPrefix === "mobile-" && (
            <button
              type="button"
              className="btn-close shadow-none"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          )}
        </div>
      </div>

      <hr className="attirex-sidebar-hr" />

      {/* 1. SORT BY */}
      <div className="attirex-filter-group">
        <span className="attirex-filter-heading">SORT BY</span>
        <div className="attirex-filter-option">
          <input
            type="radio"
            name={`${idPrefix}priceSort`}
            id={`${idPrefix}highToLow`}
            value="high"
            checked={sort === "high"}
            onChange={() => setSort("high")}
          />
          <label htmlFor={`${idPrefix}highToLow`}>Price: High to Low</label>
        </div>

        <div className="attirex-filter-option">
          <input
            type="radio"
            name={`${idPrefix}priceSort`}
            id={`${idPrefix}lowToHigh`}
            value="low"
            checked={sort === "low"}
            onChange={() => setSort("low")}
          />
          <label htmlFor={`${idPrefix}lowToHigh`}>Price: Low to High</label>
        </div>

        <div className="attirex-filter-option">
          <input
            type="radio"
            name={`${idPrefix}priceSort`}
            id={`${idPrefix}aToz`}
            value="aToz"
            checked={sort === "aToz"}
            onChange={() => setSort("aToz")}
          />
          <label htmlFor={`${idPrefix}aToz`}>Name: A to Z</label>
        </div>

        <div className="attirex-filter-option">
          <input
            type="radio"
            name={`${idPrefix}priceSort`}
            id={`${idPrefix}zToa`}
            value="zToa"
            checked={sort === "zToa"}
            onChange={() => setSort("zToa")}
          />
          <label htmlFor={`${idPrefix}zToa`}>Name: Z to A</label>
        </div>
      </div>

      <hr className="attirex-sidebar-hr" />

      {/* 2. SLIDER (Price Range) */}
      <div className="attirex-filter-group">
        <div className="d-flex justify-content-between align-items-center">
          <span className="attirex-filter-heading mb-0">PRICE</span>
          <span className="small fw-bold" style={{ fontSize: "0.82rem" }}>
            Up to ₹{price}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="5000"
          step="100"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="attirex-range-input"
          aria-label="Filter by maximum price"
        />
        <div className="attirex-slider-labels">
          <span>₹0</span>
          <span>₹2500</span>
          <span>₹5000</span>
        </div>
      </div>

      <hr className="attirex-sidebar-hr" />

      {/* 3. RATINGS (Slider + Checkboxes) */}
      <div className="attirex-filter-group">
        <div className="d-flex justify-content-between align-items-center">
          <span className="attirex-filter-heading mb-0">RATINGS</span>
          <span className="small fw-bold" style={{ fontSize: "0.82rem" }}>
            {Number(rating || sortByRating || 0) > 0
              ? `${Number(rating || sortByRating)}★ & up`
              : "All"}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={Number(rating || sortByRating || 0)}
          onChange={(e) => {
            const val = Number(e.target.value);
            if (setRating) setRating(val);
            setSortByRating(val || "");
          }}
          className="attirex-range-input"
          aria-label="Filter by minimum rating"
        />
        <div className="attirex-slider-labels mb-1">
          <span>0★</span>
          <span>2.5★</span>
          <span>5★</span>
        </div>
        {[4, 3, 2, 1].map((starVal) => (
          <div key={starVal} className="attirex-filter-option">
            <input
              type="checkbox"
              id={`${idPrefix}star-${starVal}`}
              checked={Number(sortByRating || rating) === starVal}
              onChange={() => handleRatingToggle(starVal)}
            />
            <label htmlFor={`${idPrefix}star-${starVal}`}>
              {starVal} ⭐️ and above
            </label>
          </div>
        ))}
      </div>

      <hr className="attirex-sidebar-hr" />

      {/* 4. SECTION (Women's, Men's, Kid's, Home, Electronics) */}
      <div className="attirex-filter-group">
        <span className="attirex-filter-heading">SECTION</span>
        {orderedCategories.map((cat) => (
          <div key={cat._id} className="attirex-filter-option">
            <input
              type="checkbox"
              id={`${idPrefix}sec-${cat._id}`}
              checked={selectedCats.includes(cat._id)}
              onChange={() => toggleSectionChange(cat._id)}
            />
            <label htmlFor={`${idPrefix}sec-${cat._id}`}>
              {formatSectionLabel(cat.name)}
            </label>
          </div>
        ))}
      </div>

      <hr className="attirex-sidebar-hr" />

      {/* 5. CATEGORIES (Active Wear, Dresses, Tops, Office Wear, Casual, Freestyle, Men's Formal, Sarees & Ethnic) */}
      <div className="attirex-filter-group">
        <span className="attirex-filter-heading">CATEGORIES</span>
        {SUB_CATEGORY_OPTIONS.map((subName) => {
          const safeId = `${idPrefix}sub-${subName
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-")}`;
          return (
            <div key={subName} className="attirex-filter-option">
              <input
                type="checkbox"
                id={safeId}
                checked={selectedSubCats.includes(subName)}
                onChange={() => toggleSubCategoryChange(subName)}
              />
              <label htmlFor={safeId}>{subName}</label>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
