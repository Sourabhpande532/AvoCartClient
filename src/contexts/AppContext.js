import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const AppContext = createContext();

const AppProvider = ( { children } ) => {
    const [products, setProducts] = useState( [] );
    const [categories, setCategories] = useState( [] );
    const [loading, setLoading] = useState( false );
    const [wishlist, setWishlist] = useState( [] );
    const [alert, setAlert] = useState( [] );
 
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

    const fetchWishlist = async () => {
        try {
            const res = await API.get( "/wishlist" );
            setWishlist( res.data.data.wishlist || [] );
        } catch ( error ) {
            console.error( error );
        }
    }

    const addToWishlist = async ( productId ) => {
        try {
            const res = await API.post( "/wishlist", { productId } );
            setWishlist( res.data.data.wishlist || [] );
            setAlert( prev => [...prev, { type: "success", text: "Added to wishlist" }] )
        } catch ( error ) {
            console.error( error );
        }
    }

    const removeFromWishlist = async ( id ) => {
        try {
            await API.delete( `/wishlist/${ id }` );
            await fetchWishlist();
            setAlert( prev => [...prev, { type: "warning", text: "Removed from wishlist" }] )
        } catch ( error ) {
            console.error( error );
        }
    }
    useEffect( () => {
        fetchWishlist();
        addToWishlist();
    }, [] )
    return (
        <AppContext.Provider value={ { products, setProducts, categories, loading, setLoading, wishlist, setWishlist, addToWishlist,removeFromWishlist, alert, setAlert } }>
            { children }
        </AppContext.Provider>
    )
}
const useAppFeatures = () => useContext( AppContext )
export { AppProvider, AppContext, useAppFeatures }