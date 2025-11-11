"use client"; 
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
// import { useCart } from "../contexts/CartContext";
export const Navbar: React.FC = () => {
  // const { totalItems } = useCart();
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/productsPage", label: "Products" },
    { href: "/cart", label: "Orders" },
  ];
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
        <Link href="/cart" className="cart-button">
          <ShoppingCart />
          {/* {totalItems > 0 && <span className="cart-count">{totalItems}</span>} */}
        </Link>
      </div>
    </nav>
  );
};
