import { useParams } from "react-router-dom"
import { useAppFeatures } from "../contexts/AppContext";

export const ProductDetails = () => {
    const { id } = useParams();
    const { products,addToWishlist, loading } = useAppFeatures();
    // eslint-disable-next-line eqeqeq
    const product = products.find( ( p ) => p._id == id );
    if ( loading ) return <div>Loading...</div>
    return (
        <div className="row">
            <div className="col-md-6"><img src={ product.images?.[0] } className="img-fluid" alt={ product.title } /></div>
            <div className="col-md-6">
                <h3>{ product.title }</h3>
                <p>₹{ product.price }</p>
                <p>Rating: { product.rating }</p>
                <p>{ product.description }</p>
                <button className="btn btn-primary me-2">Add to cart</button>
                <button className="btn btn-outline-secondary" onClick={()=>addToWishlist(product._id)}>Add to wishlist</button>
            </div>
        </div>
    )
}