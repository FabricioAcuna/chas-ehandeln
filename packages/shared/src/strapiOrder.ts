export async function createOrder(orderData: {
  total: number;
  statusOrder?: "paid" | "pending" | "shipped";
  items: { connect: { id: number }[] };
}) {
  const url = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/orders`;
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN; 

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ data: orderData }),
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error("Failed to create order");
  }

  return JSON.parse(text);
}
