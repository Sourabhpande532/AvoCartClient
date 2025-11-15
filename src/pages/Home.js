import { useNavigate } from "react-router-dom";
import { useAppFeatures } from "../contexts/AppContext";

export const Home = () => {
  const { categories, loading, globalSearch } = useAppFeatures();
  console.log(categories);

  const navigate = useNavigate();
  const filteredCategory = (categories || []).filter((category) =>
    (category?.name || "")
      .toLowerCase()
      .includes((globalSearch || "").toLowerCase())
  );
  if (loading) return <p className='text-center'>Loading...</p>;
  return (
    <div className='my-4'>
      <h2 className='display-6 mb-4 fw-semibold text-center'>
        Featured Categories
      </h2>

      <div className='row g-4'>
        {Array.isArray(filteredCategory) && filteredCategory.length > 0 ? (
          filteredCategory.map((cat) => (
            <div key={cat._id} className='col-md-4'>
              <div
                className='card shadow-sm h-100 border-0 category-card'
                style={{ cursor: "pointer", borderRadius: "14px" }}
                onClick={() => navigate(`/products?categorysent=${cat._id}`)}>
                {/* Image */}
                <div
                  style={{
                    height: "220px",
                    overflow: "hidden",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                  }}>
                  <img
                    src={cat.image || "https://picsum.photos/id/21/400/300"}
                    className='w-100'
                    alt={cat.name}
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      transition: "0.4s ease",
                    }}
                  />
                </div>

                {/* Body */}
                <div className='card-body'>
                  <h5 className='fw-semibold'>{cat.name}</h5>
                  <p className='text-muted small mb-0'>
                    {cat.description?.substring(0, 60)}...
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center'>Categories not found</p>
        )}
      </div>
    </div>
  );
};
