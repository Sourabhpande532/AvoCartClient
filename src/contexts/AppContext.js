import { createContext, useContext, useEffect, useState } from "react";
import API from "../api/api";

const AppContext = createContext();

const AppProvider = ( { children } ) => {
    const [products, setProducts] = useState( [] );
    const [categories, setCategories] = useState( [] );
    const [loading, setLoading] = useState( false );
    const [wishlist, setWishlist] = useState( [] );
    const [alert, setAlert] = useState( [] );
    const [cart, setCart] = useState( [] );
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

    const fetchCart = async () => {
        try {
            const res = await API.get( "/cart" );
            setCart( res.data.data.cart || [] )
        } catch ( error ) {
            console.error( error );
        }
    }

    const addToCart = async ( productId ) => {
        try {
            const res = await API.post( "/cart", { productId } )
            setCart( res.data.data.cart || [] );
            setAlert( prev => [...prev, { type: "Success", text: "Added to cart" }] )
        } catch ( error ) {
            console.error( error );
        }
    }

    const updateCartQty = async ( cartItemId, qty ) => {
        try {
            await API.put( `/cart/${ cartItemId }`, { qty } );
            await fetchCart();
            setAlert( prev => [...prev, { type: 'info', text: 'Cart updated' }] );
        } catch ( error ) {
            console.error( error );
        }
    }

    const removeFromCart = async ( cartItemId ) => {
        try {
            await API.delete( `/cart/${ cartItemId }` );
            await fetchCart();
            setAlert( prev => [...prev, { type: 'warning', text: 'Removed from cart' }] );
        } catch ( error ) {
            console.error( error );
        }
    }

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
        fetchCart();
        fetchWishlist();
    }, [] )
    return (
        <AppContext.Provider value={ { products, setProducts, categories, loading, wishlist, setWishlist, addToWishlist, removeFromWishlist,cart,setCart, addToCart, updateCartQty, removeFromCart, alert, setAlert } }>
            { children }
        </AppContext.Provider>
    )
}
const useAppFeatures = () => useContext( AppContext )
export { AppProvider, AppContext, useAppFeatures }