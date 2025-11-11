"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { strapiGetProducts } from "../../../../../packages/shared/src/strapiClient";
import type { Product } from "../../../../../packages/shared/src/types";
import { useEffect } from "react";
import { event } from "../../../lib/gtag";
import Head from "next/head";
import { useCartStore } from "../../../store/cartStore";


export default function ProductPage() {

 
  const { documentId } = useParams();
  const addToCart = useCartStore((state) => state.addToCart);

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: strapiGetProducts,
  });

  const product = products?.find((p) => p.documentId === documentId);

  useEffect(() => {
    if (product) {
      event({
        action: "product_view",
        category: "engagement",
        label: product.name,
        value: product.price,
      });
    }
  }, [product]);

  if (isLoading) return <p>Laddar produkt...</p>;
  if (!product) return <p>Produkt hittades inte.</p>;

  const descText = product.description?.[0]?.children?.[0]?.text || "";

  const imageUrl =
    product.image?.[0]?.formats?.medium?.url || product.image?.[0]?.url || null;

    


  return (
    <>
      <Head>
        <title>
          {product.name} – {product.price} kr
        </title>
        <meta name="description" content={descText.slice(0, 150)} />
      </Head>

      <main className="product-detail-container">
       
         <div className="product-image-section">
        {imageUrl && (
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
            alt={product.image[0].alternativeText || product.name}
            // style={{ maxWidth: "300px", marginBottom: "1rem" }}
            className="product-image"
          />
        )}
        </div>
        <div className="product-info-section">
         <h1 className="product-title">{product.name}</h1>
         <p className="product-price">
          <strong>Pris:</strong> {product.price} kr
        </p>
        <p className="product-description">{descText}</p>
        <div className="product-sizes">
          <h3>Select Size:</h3>
          <div className="size-options">
            <button className="size-btn">S</button>
            <button className="size-btn">M</button>
            <button className="size-btn">L</button>
            <button className="size-btn">XL</button>
          </div>
        </div>
       
        {product.inStock ? (
         <button onClick={() => addToCart(product)} className="add-to-cart-btn">
         Lägg i kundkorg
         </button>
         ) : (
         <span>Slut i lager</span>
         )}
         </div>
      </main>
    </>
  );
}

