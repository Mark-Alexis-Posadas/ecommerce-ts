import { createContext } from 'react';
import type { CartItem, Product } from '../types/product';
export interface CartContextType {
  cartItems: CartItem[];
  subtotalCentavos: number;
  totalQuantity: number;
  checkoutEligible: boolean;
  loading: boolean;
  pending: boolean;
  error: string;
  success: string;
  addToCart: (product: Product, quantity?: number) => Promise<void>;
  incrementQty: (id: string) => Promise<void>;
  decrementQty: (id: string) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}
export const CartContext = createContext<CartContextType | null>(null);
