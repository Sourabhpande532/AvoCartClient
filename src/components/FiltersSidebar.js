// eslint-disable-next-line import/no-anonymous-default-export
export default function( { rating, setRating, sort, setSort, clearAll } ) {
  console.log( sort, " ", setSort );

  return (
    <div className="">
      <div className="border-end px-4">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold">Filters</h5>
          <button className="btn btn-sm btn-outline-secondary mt-3 p-0" onClick={ clearAll }>Clear</button>
        </div>

        <div className="mt-3">
          <h6>Price</h6>
          <input
            type="range"
            min="0"
            className="form-range"
          />
          <p>Up to ₹34</p>
        </div>

        <div className="mt-4">
          <h6>Rating { rating }+</h6>
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
          <h6>Sort by Price</h6>
          <div className="form-check">
            <input
              type="radio"
              name="sort"
              className="form-check-input"
              id="low"
              checked={ sort === "low" }
              onChange={ () => setSort( "low" ) }
            />
            <label className="form-check-label" htmlFor="low">Low to High</label>
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
            <label className="form-check-label" htmlFor="high">High to Low</label>
          </div>
        </div>
      </div>

    </div>
  )
}

/* 
<div>
      <h5>Filters</h5>
      <div>
        <h6>Categories</h6>
        {categories.map(c => (
          <div key={c._id} className="form-check">
            <input className="form-check-input" type="checkbox" id={c._id} checked={selectedCats.includes(c._id)} onChange={()=> toggleCat(c._id)} />
            <label className="form-check-label" htmlFor={c._id}>{c.name}</label>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <h6>Rating: {rating}+</h6>
        <input type="range" min="0" max="5" step="0.5" value={rating} onChange={(e)=> setRating(Number(e.target.value))} />
      </div>
      <div className="mt-3">
        <h6>Sort by price</h6>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="sort" id="low" checked={sort==='low'} onChange={()=> setSort('low')} />
          <label className="form-check-label" htmlFor="low">Low to High</label>
        </div>
        <div className="form-check">
          <input className="form-check-input" type="radio" name="sort" id="high" checked={sort==='high'} onChange={()=> setSort('high')} />
          <label className="form-check-label" htmlFor="high">High to Low</label>
        </div>
      </div>
      <button className="btn btn-sm btn-outline-secondary mt-3" onClick={clearAll}>Clear Filters</button>
    </div>

*/