// eslint-disable-next-line import/no-anonymous-default-export
export default function( { categories, selectedCats, setSelectedCats, rating, setRating, rat, setRat, sort, setSort, clearAll, price, setPrice } ) {
  const toggleCategoryChange = ( categoryId ) => {
    const alreadySelected = selectedCats.includes( categoryId );
    // When uncheck it removed from here now exits remove it 
    if ( alreadySelected ) {
      // remove it when unchecked
      const updateCatsWhenUnchecked = selectedCats.filter( category => category !== categoryId )
      setSelectedCats( updateCatsWhenUnchecked )
    } else {
      // Add it when checked  
      const updatedCatsWhenChecked = [...selectedCats, categoryId];
      setSelectedCats( updatedCatsWhenChecked ) // Now Added 
    }
  }
  return (
    <div className="">
      <div className="border-end px-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">Filters</h5>
          <button className="btn btn-sm btn-outline-secondary mt-3 p-0" onClick={ clearAll }>Clear</button>
        </div>

        <div className="mt-3">
          <h4><strong>Price</strong></h4>
          <input
            type="range"
            min="300"
            max="5000"
            step="300"
            value={ price }
            onChange={ ( e ) => setPrice( Number( e.target.value ) ) }
            className="form-range"
          />
          <p>Up to ₹{ price }</p>
        </div>

        <div className="mt-3">
          <h4><strong>Categories</strong></h4>
          { categories.map( ( cat ) => (
            <div key={ cat._id } className="form-check">
              <input
                className="form-check-input"
                type="checkbox" id={ cat._id }
                checked={ selectedCats.includes( cat._id ) }
                onChange={ () => toggleCategoryChange( cat._id ) }
              />
              <label className="form-check-label" htmlFor={ cat._id }>{ cat.name }</label>
            </div>
          ) ) }

        </div>

        <div className="mt-4">
          <h4><strong>Rating { rating }+</strong></h4>
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={ rating }
            className="form-range"
            onChange={ ( e ) => setRating( Number( e.target.value ) ) }
          />
        </div>

        <div className="mt-4">
          <h4><strong>Rating +{ rat }</strong></h4>
          <div className="form-check">
            <input
              type="radio"
              name="rating"
              className="form-check-input"
              id="filterByFour"
              checked={ rat === 4 }
              onChange={ () => setRat( 4 ) }
            />
            <label className="form-check-label" htmlFor="filterByFour">4 Star & above</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="rating"
              className="form-check-input"
              id="filterByThree"
              checked={ rat === 3 }
              onChange={ () => setRat( 3 ) }
            />
            <label className="form-check-label" htmlFor="filterByThree">3- Star and above</label>
          </div>
        </div>

        <div className="mt-4">
          <h4><strong>Sort by</strong></h4>
          <div className="form-check">
            <input
              type="radio"
              name="sort"
              className="form-check-input"
              id="low"
              checked={ sort === "low" }
              onChange={ () => setSort( "low" ) }
            />
            <label className="form-check-label" htmlFor="low">Price- Low to High</label>
          </div>
          <div className="form-check">
            <input
              type="radio"
              name="sort"
              className="form-check-input"
              id="high"
              checked={ sort === "high" }
              onChange={ () => setSort( "high" ) }
            />
            <label className="form-check-label" htmlFor="high">Price - High to Low</label>
          </div>
        </div>
      </div>

    </div>
  )
}
