"use client";
import Link from "next/link";
export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">
            Elevate Your Game with Premium Football Gear
          </h1>
          <p className="hero-subtitle">
            Professional-grade boots, jerseys, and accessories designed for peak
            performance on the pitch.
          </p>
          <div className="hero-buttons">
            <Link href="/products" className="btn btn-primary">
              Shop Now
            </Link>
            <Link href="/products?category=boots" className="btn btn-secondary">
              View Boots
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="/fotball-image.jpg"
            alt="Football gear"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};
