import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1600&auto=format&fit=crop&q=80",
    tag: "AVOCART SEASONAL EDIT",
    heading: "Elevate Your Everyday Wardrobe",
    subtitle:
      "Discover curated fashion, contemporary essentials, and statement styles crafted for comfort.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80",
    tag: "LIMITED TIME OFFER",
    heading: "Flat 25% Off New Arrivals",
    subtitle:
      "Refresh your look with designer dresses, tailored menswear, and trending collections.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80",
    tag: "LUXURY & LIFESTYLE",
    heading: "Timeless Classics & Modern Fits",
    subtitle:
      "Handpicked apparel and accessories designed for every celebration and season.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&auto=format&fit=crop&q=80",
    tag: "EXPRESS DELIVERY",
    heading: "Curated Style Delivered Free",
    subtitle:
      "Enjoy free nationwide shipping and 10-day hassle-free returns on every AvoCart order.",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  const active = slides[currentSlide];

  return (
    <section className="attirex-carousel">
      <div className="attirex-banner">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`attirex-hero-slide-bg ${
              index === currentSlide ? "active" : ""
            }`}
            style={{ backgroundImage: `url("${slide.image}")` }}
            aria-hidden="true"
          />
        ))}

        <div className="attirex-banner-text">
          <span className="attirex-hero-tag">{active.tag}</span>
          <h2>{active.heading}</h2>
          <p>{active.subtitle}</p>
          <Link to="/products" className="attirex-hero-btn">
            Explore Collection
          </Link>
        </div>

        <div className="attirex-carousel-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`attirex-dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
