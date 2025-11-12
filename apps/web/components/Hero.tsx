"use client";
import Link from "next/link";
export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">
            Elevate Your Game with Premium Football jerseys
          </h1>
          <p className="hero-subtitle">
           Premium football jerseys designed for peak performance on the pitch.<br/>High-quality materials ensure durability and peak performance on the pitch<br/>  Show your team spirit with official designs from top clubs.
          </p>
          <div className="hero-buttons">
            <Link href="/productsPage" className="btn btn-primary">
              Shop Now
            </Link>
            <Link href="/productsPage" className="btn btn-secondary">
              View Jerseys
            </Link>
          </div>
        </div>
        <div className="hero-image-container">
          <img
            src="/hero-image.png"
            alt="Football gear"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  );
};
