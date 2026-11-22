import { createContext } from "react";
import type { CartItem, Product } from "../types/product";

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  incrementQty: (id: string) => Promise<void>;
  decrementQty: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
};

export const CartContext = createContext<CartContextType | null>(null);
