"use client";

import Link from "next/link";
import { useCartStore } from "../../store/cartStore";

export default function CheckoutPage() {
  const { items, total, clearCart } = useCartStore();

  const handlePurchase = () => {
    alert("Tack för ditt köp! (PayPal kommer senare)");
    clearCart();
  };

  if (items.length === 0) {
    return (
      <main style={{ padding: "2rem" }}>
        <h1>Kassan</h1>
        <p>Din kundkorg är tom.</p>
        <Link href="/">← Tillbaka till butiken</Link>
      </main>
    );
  }

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Kassan</h1>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.documentId} style={{ marginBottom: "1rem" }}>
            {item.name} — {item.price} kr × {item.quantity}
          </li>
        ))}
      </ul>

      <h3>Totalt: {total} kr</h3>

      <button
        onClick={handlePurchase}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "black",
          color: "white",
          border: "none",
        }}
      >
        Slutför köp
      </button>
    </main>
  );
}
