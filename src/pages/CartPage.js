export const CartPage = () => {
    return (
        <div className="">
            <div className="row">
      <div className="col-md-8">
        <h4>My Cart</h4>
          <div className="card mb-2 p-2">
            <div className="d-flex">
              <img src={'https://picsum.photos/id/1/200/300'} alt="imgCart" style={{width:100, height:100, objectFit:'cover'}} />
              <div className="ms-3 flex-grow-1">
                <h6>Premium</h6>
                <p>₹46</p>
                <div className="d-flex align-items-center gap-2">
                  <button className="btn btn-sm btn-outline-secondary">-</button>
                  <span>4</span>
                  <button className="btn btn-sm btn-outline-secondary">+</button>
                  <button className="btn btn-sm btn-outline-danger" >Remove</button>
                  <button className="btn btn-sm btn-outline-secondary">Move to wishlist</button>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div className="col-md-4">
        <div className="card p-3">
          <h5>Price Details</h5>
          <p>Items: 4</p>
          <p>Total: ₹56</p>
        </div>
      </div>
    </div>
        </div>
    )
}