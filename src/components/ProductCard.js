import { useNavigate } from "react-router-dom"
import { useAppFeatures } from "../contexts/AppContext";
export default function ProductCart( { product } ) {
    const navigate = useNavigate();
    const { addToWishlist} = useAppFeatures();
    
    return (
        <div className="card h-100">
            <img src={ product.images[0] || 'https://placehold.co/200' } alt={ product.title } style={ { height: 200, objectFit: "cover" } } />
            <div className="card-body d-flex flex-column">
                <h6 className="card-title" style={ { cursor: 'pointer' } } onClick={ () => navigate( `/products/${ product._id }` ) } >{ product.title }</h6>
                <p className="mb-1">₹{ product.price }</p>
                <p className="mb-2">Rating: { product.rating }</p>
                <div className="mt-auto d-flex gap-2">
                    <button className="btn btn-primary btn-sm" >Add to Cart</button>
                    <button className="btn btn-outline-secondary btn-sm" onClick={ () => addToWishlist( product._id ) }>Wishlist</button>
                </div>
            </div>
        </div >
    )
}