import { useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import type { CartItem, Product, CartItemFromAPI } from "../types/product";
import * as cartAPI from "../services/cartService";
import { mapCartItems } from "../utils/cartMapper";
import { api as axios, TOKEN_KEY } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = async (product: Product, quantity = 1) => {
    try {


      if (!token) {
        navigate("/login");
        return;
      }

      const res = await cartAPI.addToCart(product._id, quantity, token);

      if (token === localStorage.getItem(TOKEN_KEY)) setCartItems(mapCartItems(res.data.items));
    } catch {
      console.error("Add to cart failed");
    }
  };

  const incrementQty = async (productId: string) => {
    try {

      if (!token) return;

      const res = await axios.put(
        `${API_URL}/api/cart/increment`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (token === localStorage.getItem(TOKEN_KEY)) setCartItems(mapCartItems(res.data.items));
    } catch {
      console.error("Increment failed");
    }
  };

  const decrementQty = async (productId: string) => {
    try {

      if (!token) return;

      const res = await axios.put(
        `${API_URL}/api/cart/decrement`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (token === localStorage.getItem(TOKEN_KEY)) setCartItems(mapCartItems(res.data.items));
    } catch {
      console.error("Decrement failed");
    }
  };

  const removeFromCart = async (productId: string) => {
    try {

      if (!token) return;

      const res = await axios.delete(`${API_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (token === localStorage.getItem(TOKEN_KEY)) setCartItems(mapCartItems(res.data.items));
    } catch {
      console.error("Remove from cart failed");
    }
  };

  const clearCart = async () => {
    try {

      if (!token) return;

      await axios.delete(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // 🔥 important: clear frontend state
      setCartItems([]);
    } catch {
      console.error("Clear cart failed");
    }
  };

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => { if (active) setCartItems([]); });
    const fetchCart = async () => {
      try {

        if (!token) return;

        const res = await cartAPI.getCart(token);

        if (!active || token !== localStorage.getItem(TOKEN_KEY)) return;
        setCartItems(
          res.data.items.map((item: CartItemFromAPI) => ({
            ...item.product,
            quantity: item.quantity,
          })),
        );
      } catch {
        console.error("Cart request failed");
      }
    };

    fetchCart();
    return () => { active = false; };
  }, [token]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        incrementQty,
        decrementQty,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
