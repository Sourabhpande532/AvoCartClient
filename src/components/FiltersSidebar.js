export default function FiltersSidebar({
  categories,
  selectedCats,
  setSelectedCats,
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
  const toggleCategoryChange = (categoryId) => {
    const alreadySelected = selectedCats.includes(categoryId);
    if (alreadySelected) {
      const updateCatsWhenUnchecked = selectedCats.filter(
        (category) => category !== categoryId
      );
      setSelectedCats(updateCatsWhenUnchecked);
    } else {
      const updatedCatsWhenChecked = [...selectedCats, categoryId];
      setSelectedCats(updatedCatsWhenChecked);
    }
  };

  return (
    <div className='card border shadow-sm rounded-3'>
      <div className='card-body p-4'>
        <div className='d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom'>
          <h5 className='fw-bold mb-0 text-body'>Filters</h5>
          <button
            className='btn btn-sm btn-link text-decoration-none p-0 fw-semibold text-primary'
            onClick={clearAll}>
            Reset All
          </button>
        </div>

        <div className='mb-4'>
          <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Price Range</h6>
          <input
            type='range'
            min='300'
            max='5000'
            step='300'
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className='form-range'
          />
          <div className="d-flex justify-content-between small text-muted mt-1">
            <span>₹300</span>
            <span className="fw-bold text-primary">Max: ₹{price}</span>
            <span>₹5000</span>
          </div>
        </div>

        <div className='mb-4'>
          <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Categories</h6>
          <div className="d-flex flex-column gap-2">
            {categories.map((cat) => (
              <div key={cat._id} className='form-check'>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id={`${idPrefix}cat-${cat._id}`}
                  checked={selectedCats.includes(cat._id)}
                  onChange={() => toggleCategoryChange(cat._id)}
                />
                <label className='form-check-label text-body small fw-medium' htmlFor={`${idPrefix}cat-${cat._id}`}>
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='mb-4'>
          <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Minimum Rating</h6>
          <input
            type='range'
            min='0'
            max='5'
            step='0.5'
            value={rating}
            className='form-range'
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <div className="text-center small text-primary fw-bold">{rating}+ Stars</div>
        </div>

        <div className='mb-4'>
          <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Star Threshold</h6>
          <div className="d-flex flex-column gap-2">
            <div className='form-check'>
              <input
                type='radio'
                name={`${idPrefix}rating`}
                className='form-check-input'
                id={`${idPrefix}filterByFour`}
                checked={sortByRating === 4}
                onChange={() => setSortByRating(4)}
              />
              <label className='form-check-label text-body small fw-medium' htmlFor={`${idPrefix}filterByFour`}>
                4 ★ & above
              </label>
            </div>
            <div className='form-check'>
              <input
                type='radio'
                name={`${idPrefix}rating`}
                className='form-check-input'
                id={`${idPrefix}filterByThree`}
                checked={sortByRating === 3}
                onChange={() => setSortByRating(3)}
              />
              <label className='form-check-label text-body small fw-medium' htmlFor={`${idPrefix}filterByThree`}>
                3 ★ & above
              </label>
            </div>
          </div>
        </div>

        <div>
          <h6 className="fw-bold mb-3 text-uppercase small tracking-wider text-muted">Sort Order</h6>
          <div className="d-flex flex-column gap-2">
            <div className='form-check'>
              <input
                type='radio'
                name={`${idPrefix}sort`}
                className='form-check-input'
                id={`${idPrefix}low`}
                checked={sort === "low"}
                onChange={() => setSort("low")}
              />
              <label className='form-check-label text-body small fw-medium' htmlFor={`${idPrefix}low`}>
                Price: Low to High
              </label>
            </div>
            <div className='form-check'>
              <input
                type='radio'
                name={`${idPrefix}sort`}
                className='form-check-input'
                id={`${idPrefix}high`}
                checked={sort === "high"}
                onChange={() => setSort("high")}
              />
              <label className='form-check-label text-body small fw-medium' htmlFor={`${idPrefix}high`}>
                Price: High to Low
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
