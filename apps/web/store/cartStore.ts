// import { create } from "zustand";
// import type { Product } from "../../../packages/shared/src/types";

// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   items: CartItem[];
//   addToCart: (product: Product) => void;
//   removeFromCart: (documentId: string) => void;
//   clearCart: () => void;
//   total: number;
// }

// export const useCartStore = create<CartState>((set, get) => ({
//   items: [],

//   addToCart: (product) => {
//     const existing = get().items.find((p) => p.documentId === product.documentId);
//     if (existing) {
//       set({
//         items: get().items.map((p) =>
//           p.documentId === product.documentId
//             ? { ...p, quantity: p.quantity + 1 }
//             : p
//         ),
//       });
//     } else {
//       set({ items: [...get().items, { ...product, quantity: 1 }] });
//     }
//   },

//   removeFromCart: (documentId) => {
//     set({
//       items: get().items.filter((p) => p.documentId !== documentId),
//     });
//   },

//   clearCart: () => set({ items: [] }),

//   get total() {
//     return get().items.reduce((sum, p) => sum + p.price * p.quantity, 0);
//   },
// }));
import { create } from "zustand";

interface CartItem {
  documentId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (documentId: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,

  addToCart: (item) => {
    const existing = get().items.find(
      (i) => i.documentId === item.documentId
    );

    let updatedItems;
    if (existing) {
      updatedItems = get().items.map((i) =>
        i.documentId === item.documentId
          ? { ...i, quantity: i.quantity + 1 }
          : i
      );
    } else {
      updatedItems = [...get().items, { ...item, quantity: 1 }];
    }

    // ✅ Räkna om totalsumman varje gång
    const newTotal = updatedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    set({ items: updatedItems, total: newTotal });
  },

  removeFromCart: (documentId) => {
    const updatedItems = get().items.filter((i) => i.documentId !== documentId);
    const newTotal = updatedItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    set({ items: updatedItems, total: newTotal });
  },

  clearCart: () => set({ items: [], total: 0 }),
}));
