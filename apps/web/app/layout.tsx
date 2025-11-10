import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { Navbar } from "../components/Navbar"; // <- din navbar
import { Footer } from "../components/Footer";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "E-commerce",
  description:
    "Monorepo webshop project built with Next.js, Strapi and TanStack Query",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <Providers>
          <Navbar /> {/* ← Här ligger navbaren alltid på toppen */}
          {children} {/* ← Sidan som ändras */}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
