"use client";

import Link from "next/link";
import { useCartStore } from "../.../../../store/cartStore";
import { FiTrash } from "react-icons/fi";

export default function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCartStore();

  if (items.length === 0) {
    return (
   <main style={{ padding: "2rem" }}>
        <Link className="link" href="/">
          ← Tillbaka till butiken
        </Link>
        <h1 className="check-h1">Din kundkorg</h1>
        <p className="check-h1">Din kundkorg är tom.</p>
      </main>
    );
  }

  return ( 
   <main className="cart-main">
      <div className="cart-container">
        <h1>Din kundkorg</h1>
        <ul className="cart-items">
          {items.map((item) => (
            <li key={item.documentId} className="cart-item">
              <div className="cart-item-info">
                <strong>{item.name}</strong> — {item.price} kr × {item.quantity}
              </div>
              <button
                onClick={() => removeFromCart(item.documentId)}
                className="remove-btn"
              >
                <FiTrash size={20} color="#DC2626" />
              </button>
            </li>
          ))}
        </ul>
        <div className="cart-total">
          <h3>Total: {total} kr</h3>
        </div>
        <div className="cart-actions">
          <Link href="/checkout" className="cart-link">
            Gå till kassan
          </Link>
          <button onClick={clearCart} className="cart-clear-btn">
            Töm kundkorg
          </button>
        </div>
      </div>
    </main>

  );
}
