import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../hooks/useCart";

const API_URL = import.meta.env.VITE_API_URL;
interface ProductProp extends Product {
  images: string;
  stock: number;
}
const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductProp | null>(null);
  const [qty, setQty] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await fetch(`${API_URL}/api/products/${id}`);
      const data = await res.json();
      setProduct(data);
      setSelectedImage(data.image);
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="text-center">Loading...</p>;

  const isOutOfStock = product.stock === 0;

  return (
    <section className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE SECTION */}
        <div>
          <img
            src={selectedImage}
            alt={product.title}
            className="w-full h-96 object-contain rounded-xl border"
          />

          {/* thumbnails */}
          <div className="flex gap-3 mt-4">
            {[product.image, ...(product.images || [])].map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setSelectedImage(img)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${
                  selectedImage === img ? "border-indigo-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* DETAILS */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.title}</h1>

          {/* rating */}
          <p className="text-yellow-400 mb-2">
            ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
          </p>

          <p className="text-gray-400 mb-4">{product.description}</p>

          {/* price */}
          <p className="text-3xl font-bold text-indigo-400 mb-4">
            ₱{product.price}
          </p>

          {/* stock */}
          <p
            className={`mb-4 font-semibold ${
              isOutOfStock ? "text-red-500" : "text-green-400"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : `${product.stock} items available`}
          </p>

          {/* quantity */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 bg-gray-700 rounded"
            >
              -
            </button>

            <span className="text-lg">{qty}</span>

            <button
              onClick={() =>
                setQty((prev) => (prev < product.stock ? prev + 1 : prev))
              }
              className="px-3 py-1 bg-gray-700 rounded"
            >
              +
            </button>
          </div>

          {/* button */}
          <button
            disabled={isOutOfStock}
            onClick={() => addToCart({ ...product, quantity: qty })}
            className={`w-full py-3 rounded-xl font-bold transition ${
              isOutOfStock
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsPage;
