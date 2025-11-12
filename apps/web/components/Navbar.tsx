"use client";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "../store/cartStore"; 

export const Navbar: React.FC = () => {
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/productsPage", label: "Products" },
    { href: "/cart", label: "Orders" },
  ];

  const totalItems = useCartStore((state) => state.totalItems); 

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <div className="logo-icon" />
          <span className="logo-text">FootballStore</span>
        </Link>

        {/* Navigation Links */}
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="nav-link">
              {link.label}
            </Link>
          ))}
        </div>

        {/* Cart */}
        <Link href="/checkout" className="cart-button" style={{ position: "relative" }}>
          <ShoppingCart size={28} />
          {totalItems > 0 && (
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-8px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};
