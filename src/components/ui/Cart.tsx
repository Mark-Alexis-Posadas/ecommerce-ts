import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/useCart";
import type { CartItem } from "../../types/product";
import { Link } from "react-router-dom";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
};

const Cart = ({ isOpen, onClose, cartItems }: CartProps) => {
  const { incrementQty, decrementQty, removeFromCart, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[380px] bg-black/80 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full text-white">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-white/10 p-4">
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <button
              onClick={onClose}
              className="text-xl font-bold hover:text-red-500 transition"
            >
              ✕
            </button>
          </div>

          {/* Cart Items */}
          <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
            {cartItems.length === 0 ? (
              <div className="text-center mt-10 text-gray-400">
                <p className="mb-3">🛒 Your cart feels lonely...</p>
                <Link
                  to="/"
                  onClick={onClose}
                  className="text-indigo-400 hover:underline"
                >
                  Browse products
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex gap-3 border-b border-white/10 pb-3"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded bg-white p-1"
                  />

                  <div className="flex flex-col flex-1">
                    <h3 className="text-sm font-medium line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {formatCurrency(item.price)} × {item.quantity}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => decrementQty(item._id)}
                        className="w-7 h-7 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:scale-90 transition rounded text-xs"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>

                      <span className="text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => incrementQty(item._id)}
                        className="w-7 h-7 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:scale-90 transition rounded text-xs"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-400 hover:text-red-500 transition text-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <div className="text-sm text-indigo-400 font-semibold">
                      {formatCurrency(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-white/10 p-5">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-semibold text-indigo-400">
                  {formatCurrency(total)}
                </span>
              </div>

              {/* 👉 View Cart Button */}
              <Link
                to="/cart"
                onClick={onClose}
                className="w-full mb-3 border border-indigo-500 text-indigo-400 p-3 rounded-xl hover:bg-indigo-500/10 transition text-center block font-medium"
              >
                View My Cart 🛒
              </Link>

              {cartItems.length > 1 && (
                <button
                  onClick={() => {
                    if (confirm("Clear all items in cart?")) {
                      clearCart();
                    }
                  }}
                  className="w-full mb-3 border border-red-500 text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition"
                >
                  Clear Cart
                </button>
              )}

              <Link
                to="/checkout"
                onClick={onClose}
                className="w-full bg-indigo-600 p-3 rounded-xl font-semibold hover:bg-indigo-500 active:scale-95 transition text-center block"
              >
                Checkout
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
