import React from "react";

export default function Loading({ variant = "home" }) {
  if (variant === "products") {
    return (
      <div
        className="attirex-product-page fade-in"
        role="status"
        aria-label="Loading products"
      >
        <span className="visually-hidden">Loading...</span>
        <div className="attirex-product-section">
          {/* Sidebar Shimmer (Desktop) */}
          <div className="attirex-sidebar-col d-none d-lg-block">
            <div className="d-flex justify-content-between mb-3 px-2">
              <div
                className="shimmer-block rounded-2"
                style={{ width: "45%", height: "20px" }}
              />
              <div
                className="shimmer-block rounded-2"
                style={{ width: "30%", height: "20px" }}
              />
            </div>
            <hr className="attirex-sidebar-hr" />
            {[1, 2, 3, 4].map((group) => (
              <div key={group} className="mb-4 px-2">
                <div
                  className="shimmer-block rounded-2 mb-3"
                  style={{ width: "65%", height: "16px" }}
                />
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="shimmer-block rounded-2 mb-2"
                    style={{ width: `${85 - item * 10}%`, height: "14px" }}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Product Grid Shimmer */}
          <div className="attirex-products-col">
            <div className="attirex-product-list">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="attirex-product-card shimmer-card">
                  <div className="attirex-card-img-wrap shimmer-block" />
                  <div className="attirex-card-info">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <div
                        className="shimmer-block rounded-2"
                        style={{ width: "68%", height: "18px" }}
                      />
                      <div
                        className="shimmer-block rounded-pill"
                        style={{ width: "42px", height: "20px" }}
                      />
                    </div>
                    <div
                      className="shimmer-block rounded-2 mb-2"
                      style={{ width: "85%", height: "13px" }}
                    />
                    <div
                      className="shimmer-block rounded-2 mb-3"
                      style={{ width: "45%", height: "18px" }}
                    />
                    <div
                      className="shimmer-block rounded-2 mt-auto"
                      style={{ width: "100%", height: "38px" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "detail") {
    return (
      <div
        className="container py-4 py-md-5 fade-in"
        role="status"
        aria-label="Loading product details"
      >
        <span className="visually-hidden">Loading...</span>
        <div className="card border shadow-sm rounded-4 p-3 p-md-4 p-lg-5 mb-4">
          <div className="row g-4 g-lg-5 align-items-start">
            <div className="col-lg-6">
              <div
                className="shimmer-block rounded-3 w-100 attirex-detail-img"
              />
            </div>
            <div className="col-lg-6">
              <div
                className="shimmer-block rounded-2 mb-3"
                style={{ width: "40%", height: "14px" }}
              />
              <div
                className="shimmer-block rounded-2 mb-3"
                style={{ width: "78%", height: "34px" }}
              />
              <div
                className="shimmer-block rounded-pill mb-4"
                style={{ width: "140px", height: "26px" }}
              />
              <div
                className="shimmer-block rounded-3 mb-4"
                style={{ width: "100%", height: "78px" }}
              />
              <div
                className="shimmer-block rounded-3 mb-4"
                style={{ width: "100%", height: "110px" }}
              />
              <div className="d-flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div
                    key={s}
                    className="shimmer-block rounded-2"
                    style={{ width: "48px", height: "44px" }}
                  />
                ))}
              </div>
              <div className="d-flex flex-column flex-sm-row gap-3">
                <div
                  className="shimmer-block rounded-2 w-100"
                  style={{ height: "44px" }}
                />
                <div
                  className="shimmer-block rounded-2 w-100"
                  style={{ height: "44px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "cart" || variant === "profile") {
    return (
      <div
        className="container py-4 py-md-5 fade-in"
        role="status"
        aria-label="Loading content"
      >
        <span className="visually-hidden">Loading...</span>
        <div
          className="shimmer-block rounded-2 mb-4"
          style={{ width: "220px", height: "32px" }}
        />
        <div className="row g-4">
          <div className="col-lg-8">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="card border shadow-sm p-3 rounded-3 mb-3"
              >
                <div className="row g-3 align-items-center">
                  <div className="col-4 col-sm-3">
                    <div
                      className="shimmer-block rounded-3"
                      style={{ height: "120px" }}
                    />
                  </div>
                  <div className="col-8 col-sm-9">
                    <div
                      className="shimmer-block rounded-2 mb-2"
                      style={{ width: "65%", height: "20px" }}
                    />
                    <div
                      className="shimmer-block rounded-2 mb-3"
                      style={{ width: "40%", height: "16px" }}
                    />
                    <div
                      className="shimmer-block rounded-2"
                      style={{ width: "85%", height: "34px" }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div
              className="shimmer-block rounded-4"
              style={{ width: "100%", height: "280px" }}
            />
          </div>
        </div>
      </div>
    );
  }

  /* Default: Home Page Shimmer Skeleton */
  return (
    <div
      className="fade-in"
      role="status"
      aria-label="Loading catalog content"
    >
      <span className="visually-hidden">Loading catalog content...</span>

      {/* Hero Banner Shimmer */}
      <div className="attirex-banner shimmer-hero">
        <div className="attirex-banner-text shimmer-hero-card">
          <div
            className="shimmer-block rounded-2 mx-auto mb-3"
            style={{ width: "82%", height: "28px" }}
          />
          <div
            className="shimmer-block rounded-2 mx-auto mb-4"
            style={{ width: "64%", height: "16px" }}
          />
          <div
            className="shimmer-block rounded-pill mx-auto"
            style={{ width: "130px", height: "38px" }}
          />
        </div>
      </div>

      {/* Section Heading Shimmer */}
      <div className="attirex-section-header">
        <div
          className="shimmer-block rounded-2 mx-auto mb-2"
          style={{ width: "210px", height: "32px" }}
        />
        <div
          className="shimmer-block rounded-2 mx-auto"
          style={{ width: "320px", maxWidth: "85vw", height: "16px" }}
        />
      </div>

      {/* Categories Bento Grid Shimmer */}
      <div className="attirex-categories-section pb-5">
        <div className="attirex-bento-grid">
          <div className="attirex-big-box shimmer-block" />
          <div className="attirex-small-box-grid">
            <div className="attirex-small-box shimmer-block" />
            <div className="attirex-small-box shimmer-block" />
          </div>
        </div>
        <div className="attirex-secondary-cat-grid">
          <div className="attirex-subcat-box shimmer-block" />
          <div className="attirex-subcat-box shimmer-block" />
          <div className="attirex-subcat-box shimmer-block" />
        </div>
      </div>
    </div>
  );
}
