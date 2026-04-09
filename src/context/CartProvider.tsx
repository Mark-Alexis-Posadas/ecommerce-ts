import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, Product } from "../types/product";
import * as cartAPI from "../services/cartService";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (product: Product) => {
    try {
      const token = localStorage.getItem("token"); // or kung saan mo store

      if (!token) {
        console.log("No token");
        return;
      }

      const res = await cartAPI.addToCart(product._id, 1, token);

      // 🔥 gamitin response para i-update state
      setCartItems(
        res.data.items.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
        })),
      );
    } catch (error) {
      console.error("Add to cart failed", error);
    }
  };

  const incrementQty = async (productId: string, token: string) => {
    return axios.put(
      `${API_URL}/increment`,
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };

  const decrementQty = async (productId: string, token: string) => {
    return axios.put(
      `${API_URL}/decrement`,
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await cartAPI.getCart(token);

        setCartItems(
          res.data.items.map((item: any) => ({
            ...item.product,
            quantity: item.quantity,
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementQty,
        decrementQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
