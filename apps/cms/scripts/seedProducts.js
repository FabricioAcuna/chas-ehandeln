// scripts/seedProducts.js
const fetch = require("node-fetch");
const products = [
  { name: "Produkt A", price: 199, description: "Bra grej", inStock: true },
];

async function seed() {
  for (const p of products) {
    await fetch("http://localhost:1337/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: p }),
    });
  }
}
seed();
