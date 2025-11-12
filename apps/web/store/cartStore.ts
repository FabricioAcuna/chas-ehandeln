import { create } from "zustand";
import { persist, createJSONStorage  } from "zustand/middleware";

interface CartItem {
  documentId: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  totalItems: number; 
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (documentId: string) => void;
  clearCart: () => void;
}


export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      totalItems: 0, 

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

        const newTotal = updatedItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
          
        const newTotalItems = updatedItems.reduce(
          (sum, i) => sum + i.quantity,
          0
        ); 

        set({ items: updatedItems, total: newTotal, totalItems: newTotalItems });
      },

      removeFromCart: (documentId) => {
        const updatedItems = get().items.filter((i) => i.documentId !== documentId);
        const newTotal = updatedItems.reduce(
          (sum, i) => sum + i.price * i.quantity,
          0
        );
        const newTotalItems = updatedItems.reduce((sum, i) => sum + i.quantity, 0);
        set({ items: updatedItems, total: newTotal, totalItems: newTotalItems });
      },

      clearCart: () => set({ items: [], total: 0, totalItems: 0 }),
    }),
    {
      name: "cart-storage", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

