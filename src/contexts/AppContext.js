import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const AppContext = createContext();

const AppProvider = ( { children } ) => {
    const [products, setProducts] = useState( [] );
    const [categories, setCategories] = useState( [] );
    const [loading, setLoading] = useState( false );
    // console.log( "Initial Loading..products", products );
    // console.log( "Initial Loading..categories", categories );

    useEffect( () => {
        async function fetchData() {
            setLoading( true );
            try {
                const [pRes, cRes] = await Promise.all( [API.get( "/products" ), API.get( "/categories" )] )
                setProducts( pRes.data.data.products || [] )
                setCategories( cRes.data.data.categories || [] );
            } catch ( error ) {
                console.error( error );
            }
            setLoading( false )
        }
        fetchData()
    }, [] )

    return (
        <AppContext.Provider value={ { products, setProducts, categories, loading } }>
            { children }
        </AppContext.Provider>
    )
}
const useAppFeatures = () => useContext( AppContext )
export { AppProvider, AppContext, useAppFeatures }