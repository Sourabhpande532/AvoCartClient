import { useLocation } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCart from "../components/ProductCard";
import { useAppFeatures } from "../contexts/AppContext"
import { useEffect, useState } from "react";

// This is a custom React Hook that helps you read query parameters (the ?key=value part of a URL).
/* 
useLocation() → gives the full address.
URLSearchParams → lets you easily read the details (page=2, category=shoes).

const params = new URLSearchParams("?page=2&category=shoes");
params.get("page");       // "2"
params.get("category");   // "shoes"

const location = useLocation(); return object current page 
console.log(location.search);

*/

function useQuery() {
    return new URLSearchParams( useLocation().search )
}

export const ProductListing = () => {
    const { products, categories } = useAppFeatures();
    const [filtered, setFiltered] = useState( [] );
    const [selectedCats, setSelectedCats] = useState( [] );
    const [rating, setRating] = useState( 0 );
    const [sort, setSort] = useState( '' )
    const [search, setSearch] = useState( "" );
    const query = useQuery();
    console.log( selectedCats );
    // console.log( search );


    /* 
    useEffect(()=>{
    let res = [...products];
    if(selectedCats.length) res = res.filter(p => selectedCats.includes(String(p.category?._id)));
    if(rating) res = res.filter(p => p.rating >= rating);
    if(search) res = res.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));
    if(sort === 'low') res.sort((a,b)=> a.price - b.price);
    if(sort === 'high') res.sort((a,b)=> b.price - a.price);
    setFiltered(res);
  },[products, selectedCats, rating, sort, search]);

  const clearAll = () => { setSelectedCats([]); setRating(0); setSort(''); setSearch(''); };
    
    */
    useEffect( () => {
        const qcat = query.get( "category" ); // return cat id 
        const qsearch = query.get( 'search' );
        if ( qcat ) setSelectedCats( [qcat] )
        if ( qsearch ) setSearch( qsearch )
    }, [] );

    useEffect( () => {
        let res = [...products]; // copy of products 
        if ( selectedCats.length ) res = res.filter( p => selectedCats.includes( String( p.category?._id ) ) )
        setFiltered(res)
    }, [products, selectedCats] )

    return (
        <div className="row">
            <div className="col-md-3">
                <FiltersSidebar />
            </div>
            <div className="col-md-9">
                <div className="mb-3 d-flex justify-content-between">
                    <h4>Products ({filtered.length})</h4>
                    <input className="form-control w-50" placeholder="Search products" value={ search } onChange={ ( e ) => setSearch( e.target.value ) } />
                </div>
                <div className="row">
                    { filtered.map( ( p ) => (
                        <div key={ p._id } className="col-md-4 mb-3">
                            <ProductCart product={ p } />
                        </div>
                    ) ) }
                </div>
            </div>
        </div>
    )
}