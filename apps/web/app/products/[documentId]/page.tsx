"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { strapiGetProducts } from "../../../../../packages/shared/src/strapiClient";
import type { Product } from "../../../../../packages/shared/src/types";
import { useEffect } from "react";
import { event } from "../../../lib/gtag";
import Head from "next/head";

export default function ProductPage() {
  const { documentId } = useParams();

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

      <main style={{ padding: "2rem" }}>
        <h1>{product.name}</h1>

        {imageUrl && (
          <img
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
            alt={product.image[0].alternativeText || product.name}
            style={{ maxWidth: "300px", marginBottom: "1rem" }}
          />
        )}

        <p>{descText}</p>
        <p>
          <strong>Pris:</strong> {product.price} kr
        </p>

        {product.inStock ? (
          <button
            onClick={() =>
              alert(`Lade ${product.name} i kundkorgen (funktion kommer snart)`)
            }
          >
            Lägg i kundkorg
          </button>
        ) : (
          <span>Slut i lager</span>
        )}
      </main>
    </>
  );
}
