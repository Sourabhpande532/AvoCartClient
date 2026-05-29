import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <>
      {/* Hero Section */}
      <div className='row align-items-center mb-5 py-5 bg-primary-subtle rounded-4 px-4 overflow-hidden position-relative'>
        <div className='col-lg-6 position-relative z-1'>
          <h1 className='display-3 fw-bold mb-3'>
            Discover Your Next <span className='text-primary'>Favorite</span>{" "}
            Piece
          </h1>
          <p className='lead mb-4 opacity-75'>
            Explore our curated collection of premium products designed for
            modern life. Quality meets style in every category.
          </p>
          <Link to='/products' className='btn btn-primary btn-lg px-4 py-2'>
            Shop Now
          </Link>
        </div>
        <div className='col-lg-6 d-none d-lg-block position-relative'>
          <div
            className='bg-primary rounded-circle position-absolute'
            style={{
              width: "400px",
              height: "400px",
              top: "-100px",
              right: "-100px",
              opacity: "0.1",
            }}></div>
          <img
            src='https://placehold.co/600x400/6366f1/ffffff?text=Modern+Shopping'
            alt='Hero'
            className='img-fluid rounded-4 shadow-lg position-relative z-1'
          />
        </div>
      </div>
    </>
  );
};