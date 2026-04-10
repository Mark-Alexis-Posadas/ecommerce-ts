import { createContext } from "react";
import type { CartItem, Product } from "../types/product";

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  incrementQty: (id: string) => void;
  decrementQty: (id: string) => void;
  removeFromCart: (id: string) => void;
};

export const CartContext = createContext<CartContextType | null>(null);
