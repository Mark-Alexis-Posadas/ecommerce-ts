import { createContext } from "react";
import type { CartItem, Product } from "../types/product";

export type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
};

export const CartContext = createContext<CartContextType | null>(null);
