"use client";
import { useQuery } from "@tanstack/react-query";
import Products from "../../components/Products";


export default function ProductsPage() {
  return (
    <div className="container">
      <Products />
    </div>
  );
}
