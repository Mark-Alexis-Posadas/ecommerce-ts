import type { Product } from "../../types/product";

type Props = {
  product: Product;
  handleAddToCart: (product: Product) => void;
};

const ProductCard = ({ product, handleAddToCart }: Props) => {
  return (
    <div className="group relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-3">
      {/* IMAGE */}
      <div className="h-48 flex items-center justify-center bg-white p-4 rounded-t-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      {/* CONTENT */}
      <div className="p-5 text-white">
        <h3 className="text-lg font-bold line-clamp-1">{product.title}</h3>

        <p className="text-sm text-gray-300 capitalize">{product.category}</p>

        {/* RATING */}
        <div className="flex items-center gap-1 mt-2">
          <span className="text-yellow-400">★</span>
          <span className="text-sm font-medium">{product.rating?.rate}</span>
        </div>

        {/* PRICE */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-indigo-400">
            ${product.price}
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={() => handleAddToCart(product)}
          className="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-bold tracking-wide hover:bg-indigo-500 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
