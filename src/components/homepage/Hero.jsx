import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    image:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1683867706/E-comm%20ATTIREX/carousel1_xdmpbx.jpg",
    fallback:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1400&auto=format&fit=crop&q=80",
    heading: "Get 20% off on your first order!",
    subtitle: "Find your perfect shopping experience at AvoCart",
  },
  {
    image:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1683867723/E-comm%20ATTIREX/carousel2_ubxgzo.jpg",
    fallback:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&auto=format&fit=crop&q=80",
    heading: "New Season Arrivals 2026",
    subtitle: "Explore timeless menswear, designer dresses, and modern essentials",
  },
  {
    image:
      "https://res.cloudinary.com/dptfwcnro/image/upload/v1683867713/E-comm%20ATTIREX/carousel3_thepsd.jpg",
    fallback:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1400&auto=format&fit=crop&q=80",
    heading: "Curated Luxury & Everyday Comfort",
    subtitle: "Premium quality crafted for every celebration and lifestyle",
  },
];

export const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const active = slides[currentSlide];

  return (
    <section className="attirex-carousel">
      <div
        className="attirex-banner"
        style={{
          backgroundImage: `url("${active.image}"), url("${active.fallback}")`,
        }}>
        <div className="attirex-banner-text">
          <h2>{active.heading}</h2>
          <p>{active.subtitle}</p>
          <Link to="/products" className="attirex-hero-btn">
            Shop Now
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
