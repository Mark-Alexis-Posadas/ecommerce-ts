import { useState, useEffect } from "react";
import axios from "axios";
import type { Product } from "../types/product";
const API_URL = import.meta.env.VITE_API_URL;

const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data.data);
      } catch (error) {
        setError("Failed to fetch products");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export default useProducts;
