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
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("No token");
        return;
      }

      const res = await cartAPI.addToCart(product._id, 1, token);

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

  const incrementQty = async (productId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    return axios.put(
      `${API_URL}/api/cart/increment`,
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };

  const decrementQty = async (productId: string) => {
    const token = localStorage.getItem("token");
    return axios.put(
      `${API_URL}/api/cart/decrement`,
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  };

  const removeFromCart = async (productId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await axios.delete(`${API_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCartItems(
        res.data.items.map((item: any) => ({
          ...item.product,
          quantity: item.quantity,
        })),
      );
    } catch (error) {
      console.error("Remove from cart failed", error);
    }
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
