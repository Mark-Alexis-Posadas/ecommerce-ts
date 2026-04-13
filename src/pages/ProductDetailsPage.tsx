import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../hooks/useCart";
const API_URL = import.meta.env.VITE_API_URL;
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  return (
    <section className="px-10 py-20 max-w-5xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-80 object-contain"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-400 mb-4">{product.description}</p>

          <p className="text-2xl font-bold text-indigo-400 mb-6">
            ₱{product.price}
          </p>

          <button
            onClick={(e) => {
              e.stopPropagation(); // extra safety
              addToCart(product);
            }}
            className="px-6 py-3 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
