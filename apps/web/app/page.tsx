// "use client";

// import Head from "next/head";
// import Link from "next/link";
// import { useQuery } from "@tanstack/react-query";
// import { strapiGetProducts } from "../../../packages/shared/src/strapiClient";
// import type { Product } from "../../../packages/shared/src/types";
// import { Hero } from "../components/Hero";

// export default function HomePage() {
//   const {
//     data: products,
//     isLoading,
//     error,
//   } = useQuery<Product[]>({
//     queryKey: ["products"],
//     queryFn: strapiGetProducts,
//   });

//   if (isLoading) return <p>Laddar produkter...</p>;
//   if (error) return <p>Kunde inte ladda produkter.</p>;

//   return (
//     <>
//       <Head>
//         <title>Fotbollströjor – Eshoppen</title>
//         <meta
//           name="description"
//           content="Köp fotbollströjor 2024/2025 från Milan, Barca, Juventus m.fl."
//         />
//       </Head>
//       <Hero />

//       <main style={{ padding: "2rem" }}>
//         <h1>Produkter</h1>

//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {products?.map((p) => {
//             const imageUrl =
//               p.image?.[0]?.formats?.thumbnail?.url ||
//               p.image?.[0]?.url ||
//               null;

//             return (
//               <li
//                 key={p.id}
//                 style={{
//                   marginBottom: "1rem",
//                   display: "flex",
//                   alignItems: "center",
//                 }}
//               >
//                 {imageUrl && (
//                   <img
//                     src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl}`}
//                     alt={p.image[0].alternativeText || p.name}
//                     style={{
//                       width: 50,
//                       height: 50,
//                       marginRight: "1rem",
//                       objectFit: "cover",
//                     }}
//                   />
//                 )}
//                 <Link href={`/products/${p.documentId}`}>
//                   <strong>{p.name}</strong> – {p.price} kr
//                 </Link>
//               </li>
//             );
//           })}
//         </ul>
//       </main>
//     </>
//   );
// }

"use client";
import "./globals.css";
import { useQuery } from "@tanstack/react-query";
import { Hero } from "../components/Hero";
import Products from "../components/Products";
// import { ProductsGrid } from "./pages/ProductsGrid";
export default function Home() {
  return (
    <div className="container">
      <Hero />
      <Products />
    </div>
  );
}
