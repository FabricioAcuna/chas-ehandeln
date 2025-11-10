"use client";
import { useQuery } from "@tanstack/react-query";
import Products from "../../components/Products";
// import { ProductsGrid } from "./pages/ProductsGrid";

export default function ProductsPage() {
  return (
    <div className="container">
      <Products />
    </div>
  );
}
