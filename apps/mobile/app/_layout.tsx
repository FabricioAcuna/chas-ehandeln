import { Stack } from 'expo-router';
import { CartProvider } from '@/components/CartContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
// Import strapiConfig early to set up environment variables
import '@/lib/strapiConfig';

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60 * 5, // 5 minutes
        retry: 1,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </CartProvider>
    </QueryClientProvider>
  );
}
