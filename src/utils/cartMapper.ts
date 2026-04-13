import type { CartItemFromAPI, CartItem } from "../types/product";

export const mapCartItems = (items: CartItemFromAPI[]): CartItem[] =>
  items.map((item) => ({
    ...item.product,
    quantity: item.quantity,
  }));
