import { useCart } from "../../hooks/useCart";
import type { Product } from "../../types/product";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { cartItems, addToCart, incrementQty, decrementQty } = useCart();

  const cartItem = cartItems.find((item) => item.id === product.id);

  return (
    <div className="group relative rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-3">
      <div className="h-48 flex items-center justify-center bg-white p-4 rounded-t-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-full object-contain"
        />
      </div>

      <div className="p-5 text-white">
        <h3 className="text-lg font-bold line-clamp-1">{product.title}</h3>

        <p className="text-sm text-gray-300 capitalize">{product.category}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-extrabold text-indigo-400">
            ${product.price}
          </span>
        </div>

        {!cartItem ? (
          <button
            onClick={() => addToCart(product)}
            className="mt-5 w-full rounded-xl bg-indigo-600 py-3 font-bold"
          >
            Add to Cart
          </button>
        ) : (
          <div className="mt-5 flex items-center justify-between bg-indigo-600 rounded-xl p-2">
            <button onClick={() => decrementQty(product.id)}>
              <FontAwesomeIcon icon={faMinus} />
            </button>

            <span>{cartItem.quantity}</span>

            <button onClick={() => incrementQty(product.id)}>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
