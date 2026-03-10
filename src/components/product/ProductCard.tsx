import type { Product } from "../../types/product";

type Props = {
  product: Product;
  handleAddToCart: (product: Product) => void;
};

const ProductCard = ({ product, handleAddToCart }: Props) => {
  return (
    <div className="group relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-3">
      {/* FEATURED BADGE */}
      {product.isFeatured && (
        <span className="absolute top-4 left-4 z-10 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
          FEATURED
        </span>
      )}

      {/* IMAGE */}
      <div className="h-48 rounded-t-2xl bg-linear-to-r from-gray-700 via-gray-600 to-gray-700  flex items-center justify-center">
        <span className="text-gray-400 text-sm tracking-widest">IMAGE</span>
      </div>

      {/* CONTENT */}
      <div className="p-5 text-white">
        <h3 className="text-lg font-bold truncate">{product.name}</h3>

        <p className="text-sm text-gray-300 capitalize">{product.category}</p>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">{product.rating}</span>
        </div>

        {/* PRICE + STOCK */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-indigo-400">
            ₱{product.price.toLocaleString()}
          </span>

          <span
            className={`text-xs font-semibold px-2 py-1 rounded-full ${
              product.stock > 0
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => handleAddToCart(product)}
          disabled={product.stock === 0}
          className="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-bold tracking-wide hover:bg-indigo-500 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
