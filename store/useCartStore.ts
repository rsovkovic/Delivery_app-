import { create } from 'zustand';
import { Product } from '@/types/shop';
import { persist } from 'zustand/middleware';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  activeShopId: string | null;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  replaceCart: (newItems: CartItem[], shopId: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      activeShopId: null,

      addToCart: (product) => {
        const state = get();

        if (state.activeShopId && state.activeShopId !== product._id) {
          alert('You can only order from one shop at a time!');
          return;
        }

        const existingItem = state.items.find(
          (item) => item._id === product._id,
        );

        if (existingItem) {
          set({
            items: state.items.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            ),
          });
        } else {
          set({
            items: [...state.items, { ...product, quantity: 1 }],
            activeShopId: product._id,
          });
        }
      },

      removeFromCart: (productId) =>
        set((state) => {
          const updatedItems = state.items.filter(
            (item) => item._id !== productId,
          );
          return {
            items: updatedItems,
            activeShopId: updatedItems.length === 0 ? null : state.activeShopId,
          };
        }),

      updateQuantity: (productId, delta) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === productId
              ? { ...item, quantity: Math.max(1, item.quantity + delta) }
              : item,
          ),
        })),

      clearCart: () => set({ items: [], activeShopId: null }),

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      replaceCart: (newItems, shopId) => {
        set({
          items: newItems,
          activeShopId: shopId,
        });
      },
    }),
    {
      name: 'cart-storage',
    },
  ),
);
