import type { Product } from "../../types/product";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className="max-w-sm bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group">
      <div className="relative bg-gray-100 p-6 flex justify-center">
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1 rounded-full">
          SALE
        </span>

        <img
          src={product.image}
          alt={product.name}
          className="h-40 object-contain group-hover:scale-110 transition duration-300"
        />
      </div>

      <div className="p-5 space-y-2">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>

        <p className="text-gray-500 text-sm">{product.description}</p>

        <p className="text-xl font-bold text-gray-900">₱{product.price}</p>

        <button className="w-full mt-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
          🛒 Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
