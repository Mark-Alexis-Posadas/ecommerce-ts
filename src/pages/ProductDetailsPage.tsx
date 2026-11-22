import { productPlaceholder } from "../utils/productImage";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Product } from "../types/product";
import { useCart } from "../hooks/useCart";
const API_URL = import.meta.env.VITE_API_URL;
const ProductDetailsPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState("");
    const [qty, setQty] = useState(1);
    const [selectedImage, setSelectedImage] = useState("");
    const { addToCart, pending, loading: cartLoading, cartItems } = useCart();
    useEffect(() => {
        const fetchProduct = async () => {
            const res = await fetch(`${API_URL}/api/products/${id}`);
            if (!res.ok) {
                setError("Product unavailable");
                return;
            }
            const data: Product = await res.json();
            setProduct(data);
            setSelectedImage(data.image || data.images[0] || "");
        };
        fetchProduct().catch(() => setError("Failed to load product"));
    }, [id]);
    if (error)
        return <p className="text-center">{error}</p>;
    if (!product)
        return <p className="text-center">Loading...</p>;
    const alreadyInCart = cartItems.find(item => item._id === product._id)?.quantity || 0;
    const remaining = Math.max(0, product.stock - alreadyInCart);
    const isOutOfStock = product.stock <= 0 || product.isActive === false;
    return (<section className="px-6 md:px-10 py-16 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12">
        {/* IMAGE SECTION */}
        <div>
          <img onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = productPlaceholder; }} src={selectedImage || productPlaceholder} alt={product.title} className="w-full h-96 object-contain rounded-xl border"/>

          {/* thumbnails */}
          <div className="flex gap-3 mt-4">
            {(product.image ? [product.image, ...product.images] : product.images).map((img, i) => (<img onError={event => { event.currentTarget.onerror = null; event.currentTarget.src = productPlaceholder; }} key={i} src={img} onClick={() => setSelectedImage(img)} className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${selectedImage === img ? "border-indigo-500" : ""}`}/>))}
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
            ₱{product.priceAfterDiscount ?? product.price}
          </p>

          {/* stock */}
          <p className={`mb-4 font-semibold ${isOutOfStock ? "text-red-500" : "text-green-400"}`}>
            {isOutOfStock ? "Out of Stock" : `${product.stock} items available`}
          </p>

          {alreadyInCart > 0 && <p className="mb-4 text-sm text-gray-400">{alreadyInCart} already in your cart. You can add up to {remaining} more.</p>}
          {/* quantity */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={() => setQty((prev) => Math.max(1, prev - 1))} className="px-3 py-1 bg-gray-700 rounded">
              -
            </button>

            <span className="text-lg">{qty}</span>

            <button onClick={() => setQty((prev) => (prev < remaining ? prev + 1 : prev))} className="px-3 py-1 bg-gray-700 rounded">
              +
            </button>
          </div>

          {/* button */}
          <button disabled={isOutOfStock || pending || cartLoading || qty > remaining} onClick={() => addToCart(product, qty)} className={`w-full py-3 rounded-xl font-bold transition ${isOutOfStock
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-500"}`}>
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </section>);
};
export default ProductDetailsPage;
