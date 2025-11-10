"use client"; // Viktigt! Client component

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { pageview } from "../lib/gtag";

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    pageview(`${pathname}${searchParams ? "?" + searchParams.toString() : ""}`);
  }, [pathname, searchParams]);

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
