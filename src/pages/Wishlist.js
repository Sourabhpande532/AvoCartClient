/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable jsx-a11y/alt-text */
export const Wishlist = () => {
    return (
        <div>
            <h4>My Wishlist</h4>
            <div className="row">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <img src={ 'https://picsum.photos/id/2/209/300' } className="card-img-top" style={ { height: 200, objectFit: 'cover' } } />
                        <div className="card-body">
                            <h6 style={ { cursor: 'pointer' } }>wishlist</h6>
                            <p>₹45</p>
                            <div className="d-flex gap-2">
                                <button className="btn btn-primary btn-sm" >Add to Cart</button>
                                <button className="btn btn-outline-danger btn-sm" >Remove</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}