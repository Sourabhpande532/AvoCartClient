import { Link, useNavigate } from "react-router-dom";
import {
  getFallbackImage,
  COLLECTION_TILES,
  titleToImageMap,
} from "../../utils/fallbackImage";

export const FeaturedCategory = () => {
  return (
    <div id="categories" className="attirex-section-header">
      <h2>CATEGORIES</h2>
      <p className="attirex-block-note">
        We find the best suppliers and makers of fashion and lifestyle products.
      </p>
    </div>
  );
};

export const Categories = ({ filteredCategory = [] }) => {
  const navigate = useNavigate();

  const primaryCat = filteredCategory[0];
  const secondCat = filteredCategory[1];
  const thirdCat = filteredCategory[2];
  const remainingCats = filteredCategory.slice(3);

  const getCategoryBannerImage = (cat) => {
    if (!cat) return getFallbackImage("");
    const name = (cat.name || "").toLowerCase();
    if (name.includes("men") && !name.includes("women")) {
      return titleToImageMap["Men Premium Jacket"];
    }
    if (name.includes("women")) {
      return titleToImageMap["Women Party Dress"];
    }
    if (name.includes("kid")) {
      return titleToImageMap["Kids Premium Jacket"];
    }
    if (name.includes("home")) {
      return titleToImageMap["Home Premium Joggers"];
    }
    if (name.includes("electronic")) {
      return titleToImageMap["Wireless Noise-Canceling Headphones"];
    }
    return cat.image && !cat.image.includes("pollinations.ai")
      ? cat.image
      : getFallbackImage(cat.name);
  };

  const renderCategoryOverlay = (cat) => (
    <div className="attirex-category-overlay">
      <h3>{cat.name}</h3>
      {cat.description && <p>{cat.description}</p>}
      <Link
        to={`/products?category=${cat._id}`}
        className="attirex-shop-pill"
        onClick={(e) => e.stopPropagation()}
      >
        Shop Now
      </Link>
    </div>
  );

  return (
    <div className="attirex-categories-section">
      {/* 1. Dynamic Categories Bento Grid */}
      {Array.isArray(filteredCategory) && filteredCategory.length > 0 ? (
        <>
          {filteredCategory.length >= 3 ? (
            <>
              <div className="attirex-bento-grid">
                {primaryCat && (
                  <div
                    className="attirex-big-box"
                    onClick={() =>
                      navigate(`/products?category=${primaryCat._id}`)
                    }
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={getCategoryBannerImage(primaryCat)}
                      alt={primaryCat.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = getFallbackImage(primaryCat.name);
                      }}
                    />
                    {renderCategoryOverlay(primaryCat)}
                  </div>
                )}

                <div className="attirex-small-box-grid">
                  {[secondCat, thirdCat].filter(Boolean).map((cat) => (
                    <div
                      key={cat._id}
                      className="attirex-small-box"
                      onClick={() => navigate(`/products?category=${cat._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={getCategoryBannerImage(cat)}
                        alt={cat.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getFallbackImage(cat.name);
                        }}
                      />
                      {renderCategoryOverlay(cat)}
                    </div>
                  ))}
                </div>
              </div>

              {remainingCats.length > 0 && (
                <div className="attirex-secondary-cat-grid">
                  {remainingCats.map((cat) => (
                    <div
                      key={cat._id}
                      className="attirex-subcat-box"
                      onClick={() => navigate(`/products?category=${cat._id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={getCategoryBannerImage(cat)}
                        alt={cat.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = getFallbackImage(cat.name);
                        }}
                      />
                      {renderCategoryOverlay(cat)}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="attirex-secondary-cat-grid">
              {filteredCategory.map((cat) => (
                <div
                  key={cat._id}
                  className="attirex-subcat-box"
                  onClick={() => navigate(`/products?category=${cat._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <img
                    src={getCategoryBannerImage(cat)}
                    alt={cat.name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = getFallbackImage(cat.name);
                    }}
                  />
                  {renderCategoryOverlay(cat)}
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-5">
          <div className="fs-1 mb-3 text-muted">🔍</div>
          <h4 className="fw-bold mb-2">No categories found</h4>
          <p className="text-muted small">Try adjusting your search keywords</p>
        </div>
      )}

      {/* 2. ATTIREX Sale Banner Section */}
      <div className="attirex-section-header">
        <h2>SALE</h2>
        <p className="attirex-block-note">
          The most awaited sale is here to elevate your wardrobe.
        </p>
      </div>

      <div className="attirex-sale-grid">
        {[
          {
            src: "https://res.cloudinary.com/dptfwcnro/image/upload/v1683903022/E-comm%20ATTIREX/Sale-Banner-1_mzj7ko.gif",
            fallback: titleToImageMap["Wedding Bridal Gown"],
            alt: "Season End Sale Banner",
          },
          {
            src: "https://res.cloudinary.com/dptfwcnro/image/upload/v1683903949/E-comm%20ATTIREX/Sale-Banner-2_rifmbx.jpg",
            fallback: titleToImageMap["Women Party Dress"],
            alt: "Fashion Offer Banner",
          },
          {
            src: "https://res.cloudinary.com/dptfwcnro/image/upload/v1683903950/E-comm%20ATTIREX/Sale-Banner-3_si788m.jpg",
            fallback: titleToImageMap["Men Trending Safari Suit"],
            alt: "Exclusive Deal Banner",
          },
        ].map((banner, idx) => (
          <div
            key={idx}
            className="attirex-sale-card"
            onClick={() => navigate("/products")}
          >
            <img
              src={banner.src}
              alt={banner.alt}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = banner.fallback;
              }}
            />
          </div>
        ))}
      </div>

      {/* 3. ATTIREX Clothing & Lifestyle Collections Mosaic (1-to-1 Image & SubCategory Match) */}
      <div className="attirex-section-header">
        <h2>CLOTHING & LIFESTYLE COLLECTIONS</h2>
        <p className="attirex-block-note">
          We find the best suppliers and makers of fashion and fancy products.
        </p>
      </div>

      <div className="attirex-mosaic-grid">
        {COLLECTION_TILES.map((tile, index) => {
          const targetUrl = `/products?sub=${encodeURIComponent(
            tile.subCategory
          )}`;
          return (
            <div
              key={index}
              className="attirex-mosaic-item"
              onClick={() => navigate(targetUrl)}
            >
              <img
                src={tile.image}
                alt={tile.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = tile.fallback;
                }}
              />
              <div className="attirex-mosaic-overlay">
                <div className="attirex-mosaic-title">{tile.title}</div>
                <Link
                  to={targetUrl}
                  className="attirex-mosaic-btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
