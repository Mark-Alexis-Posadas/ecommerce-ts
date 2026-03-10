import { useState } from "react";
import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";
import type { CartItem, Product } from "./types/product";

const App = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-black to-gray-900 text-white">
      <Navbar cartItems={cartItems} />
      <HomePage handleAddToCart={handleAddToCart} />
      <Footer />
    </div>
  );
};

export default App;
