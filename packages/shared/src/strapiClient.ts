// Support both EXPO_PUBLIC_STRAPI_URL (mobile) and NEXT_PUBLIC_STRAPI_URL (web)
const STRAPI_BASE =
  process.env.EXPO_PUBLIC_STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337";

export const strapiGetProducts = async () => {
  const res = await fetch(`${STRAPI_BASE}/api/products?populate=image`);
  if (!res.ok) throw new Error("Failed to fetch products");
  const json = await res.json();
  return json.data;
};

export const strapiGetProduct = async (idOrDocId: string) => {
  const res = await fetch(
    `${STRAPI_BASE}/api/products/${idOrDocId}?populate=image`
  );
  if (!res.ok) throw new Error("Failed to fetch product");
  const json = await res.json();
  return json.data;
};

// Hämtar alla orders från Strapi
export const strapiGetOrders = async () => {
  const res = await fetch(`${STRAPI_BASE}/api/orders?populate=items`);
  if (!res.ok) throw new Error("Failed to fetch orders");
  const json = await res.json();
  return json.data;
};
