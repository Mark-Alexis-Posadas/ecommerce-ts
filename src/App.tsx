import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";

import HomePage from "./pages/HomePage";
import type { CartItem, Product } from "./types/product";
import ProductPage from "./pages/ProductPage";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";

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
      <Routes>
        <Route
          path="/"
          element={<HomePage handleAddToCart={handleAddToCart} />}
        />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
