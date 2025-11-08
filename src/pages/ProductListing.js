import { useLocation } from "react-router-dom";
import FiltersSidebar from "../components/FiltersSidebar";
import ProductCart from "../components/ProductCard";
import { useAppFeatures } from "../contexts/AppContext"
import { useEffect, useState } from "react";

//useQuery: This is a custom React Hook that helps you read query parameters (the ?key=value part of a URL).
/* 
useLocation() → gives the full address of page e.g pathname,search.
URLSearchParams → lets you easily read the details (page=2, category=shoes).
e.g 
const params = new URLSearchParams("?page=2&category=shoes");
params.get("page");       // "2"
params.get("category");   // "shoes"

const location = useLocation(); return object with current page details; e.g search ...
console.log(location.search); i.e ?page=3&category=xyz 

*/

function useQuery() {
    return new URLSearchParams( useLocation().search )
}

export const ProductListing = () => {
    const { products, categories,loading } = useAppFeatures();
    const [filtered, setFiltered] = useState( [] );
    const [selectedCats, setSelectedCats] = useState( "" );
    const [rating, setRating] = useState( 0 );
    const [sort, setSort] = useState( '' )
    const [search, setSearch] = useState( "" );
    const query = useQuery();


    // PAGE LOAD ....FIRT TIME GET ID LOGIC ENSURE UI LOAD PROPERLY THEN RUN THIS WHRN REDIRECT FORM HOME TO HERE LISTING PAGE 
    useEffect( () => {
        const qcat = query.get( "categorysent" ); //return ID: e.g 690c2841fb89580b5ca2f5d0
        const qsearch = query.get( 'search' );
        if ( qcat ) setSelectedCats( qcat )
        if ( qsearch ) setSearch( qsearch )
    }, [] );
    // UPADATE CATE HERE NO SEPARATE THIS setCategories[QCAT] TO [..here..] FROM STATE selectedCats


    // FILTERED CATEGORY ON PAGE LOAD WHEN PRODUCT CHANGE AND SELECTED CAT CHANGE 
    useEffect( () => {
        // Copy of all products 11 to Filter one into 3 or 4 ... product cart so product change i.w [products]
        let res = [...products];
        if ( selectedCats.length ) res = res.filter( ( product ) => product.category?._id === selectedCats );
        if ( rating ) res = res.filter( ( product ) => product.rating >= rating )
        if ( sort === "low" ) res.sort( ( a, b ) => a.price - b.price )
        if ( sort === "high" ) res.sort( ( a, b ) => b.price - a.price )
        setFiltered( res )
    }, [products, selectedCats, rating, sort] )

    const clearAll = () => {setRating( 0 ); setSort( "" ) }
    if(loading) return <p className="text-center">Loading...</p>
    return (
        <div className="row">
            <div className="col-md-3">
                <FiltersSidebar rating={ rating } setRating={ setRating } sort={ sort } setSort={ setSort } clearAll={ clearAll } />
            </div>
            <div className="col-md-9">
                <div className="mb-3 d-flex justify-content-between">
                    <h4>Products ({ filtered.length })</h4>
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