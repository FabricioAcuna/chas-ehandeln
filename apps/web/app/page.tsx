
"use client";
import "./globals.css";
import { useQuery } from "@tanstack/react-query";
import Hero from "../components/Hero";
import Products from "../components/Products";

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <Products />
    </div>
  );
}
