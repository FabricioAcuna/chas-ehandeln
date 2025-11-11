"use client";

import Link from "next/link";
import { useCartStore } from "../.../../../store/cartStore";

export default function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Din kundkorg</h1>
        <p>Din kundkorg är tom.</p>
        <Link href="/">← Tillbaka till butiken</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Din kundkorg</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.documentId}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "1rem",
              borderBottom: "1px solid #ddd",
              paddingBottom: "0.5rem",
            }}
          >
            <div>
              <strong>{item.name}</strong> — {item.price} kr × {item.quantity}
            </div>
            <button onClick={() => removeFromCart(item.documentId)}>Ta bort</button>
          </li>
        ))}
      </ul>

      <h3>Total: {total} kr</h3>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/checkout">Gå till kassan</Link>
        <button style={{ marginLeft: "1rem" }} onClick={clearCart}>
          Töm kundkorg
        </button>
      </div>
    </main>
  );
}
