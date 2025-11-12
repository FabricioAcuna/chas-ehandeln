"use client";

import Head from "next/head";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { strapiGetProducts } from "../../../packages/shared/src/strapiClient";
import type { Product } from "../../../packages/shared/src/types";
import { Hero } from "../components/Hero";

export default function HomePage() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: strapiGetProducts,
  });

  if (isLoading) return <p>Laddar produkter...</p>;
  if (error) return <p>Kunde inte ladda produkter.</p>;

  return (
    <>
      <Head>
        <title>Fotbollströjor Online - Köp Officiella Jerseys 2024/2025</title>
        <meta
          name="description"
          content="Köp fotbollströjor 2024/2025 från topplagen Milan, Barcelona, Juventus, Arsenal och fler. Officiella jerseys med snabb leverans."
        />
      </Head>
      
      <main>
        <h1 className="products-title">Officiella Fotbollströjor</h1>

        <ul className="products-grid">
          {products?.map((p) => {
            const imageUrl =
              p.image?.[0]?.formats?.large?.url || p.image?.[0]?.url || null;

            return (
              
              <Link
                key={p.id}
                href={`/products/${p.documentId}`}
                className="product-link"
              >
                <li key={p.id} className="products-grid li">
                  {imageUrl && (
                    <div className="card-image-container">
                      <img
                        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
                        alt={p.image[0].alternativeText || p.name}
                        className="card-image"
                      />
                    </div>
                  )}
            
                  <div className="card-info">
                    <span className="product-name">{p.name}</span>
                    <span className="product-price">{p.price}:-</span>
                  </div>
                  <div className="productCard-button-container">
                  <button  className="productCard-button">Se tillgänglihet</button>
                  </div>
                </li>
                
              </Link>
            );
          })}
        </ul>
      </main>
    </>
  );
}
