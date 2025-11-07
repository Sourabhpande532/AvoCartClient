import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";

export const Home = () => {
    const { categories, loading } = useAppFeatures()
    const navigate = useNavigate();
    if ( loading ) return <p className="text-center">Loading...</p>
    return (
        <div>
            <h2 className="display-5">Featured Categories</h2>
            <div className="row">
                { Array.isArray( categories ) && categories.length > 0 ? (
                    categories.map( ( cat ) => (
                        <div key={ cat._id } className="col-md-4 mb-3">
                            <div className="card" style={ { cursor: "pointer" } } onClick={ () => navigate( `/products?category=${ cat._id }` ) }>
                                <img src={ cat.image || 'https://via.placeholder.com/400x200' } className="img-fluid card-img-top" alt={ cat.name }
                                style={{maxWidth:"440px", maxHeight:"250px", objectFit:"cover"}}
                                />
                                <div className="card-body">
                                <h5 className="card-title">{cat.name}</h5>
                                <p className="card-text">{cat.description}</p>
                                </div>
                            </div>
                        </div>
                    ) )
                ) : (
                    <>
                        <p>Categories not found</p>
                    </>
                ) }
            </div>
        </div>
    )
};
