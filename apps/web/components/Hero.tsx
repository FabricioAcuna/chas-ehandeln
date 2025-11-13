"use client";
import Link from "next/link";
export default function Hero(){
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-text">
          <h1 className="hero-title">
              Höj ditt spel med premium fotbollströjor
          </h1>
          <p className="hero-subtitle">
           Fotbollströjor i premiumkvalitet, designade för maximal prestanda på planen.<br />
           Tillverkade i slitstarka material som ger komfort och hållbarhet i varje match.<br />
           Visa ditt stöd med officiella designer från världens främsta klubbar.
          </p>
          <div className="hero-buttons">
            <Link href="/productsPage" className="btn btn-primary">
              Shoppa nu
            </Link>
            <Link href="/productsPage" className="btn btn-secondary">
              Se fotbollströjor
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
