import {formatCentavos} from "../../utils/cartMoney";
import {CartFeedback,CartLineIssues} from "../../components/cart/CartFeedback";
import {productPlaceholder} from "../../utils/productImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../../hooks/useCart";
import type { CartItem } from "../../types/product";
import { Link, useNavigate } from "react-router-dom";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
};

const Cart = ({ isOpen, onClose, cartItems }: CartProps) => {
  const navigate=useNavigate();
  const { incrementQty, decrementQty, removeFromCart, clearCart, subtotalCentavos, checkoutEligible, loading, pending } = useCart();

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
        inert={!isOpen}
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-[380px] max-w-full bg-black/80 backdrop-blur-xl border-l border-white/10 shadow-2xl z-50 transform transition-transform duration-300
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

          <div className="px-4 pt-3"><CartFeedback /></div>
          {/* Cart Items */}
          <div className="p-4 flex flex-col gap-4 overflow-y-auto flex-1">
            {loading && cartItems.length === 0 ? null : cartItems.length === 0 ? (
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
                  key={item.lineId}
                  className="flex gap-3 border-b border-white/10 pb-3"
                >
                  <img
                    src={item.image || item.images[0] || productPlaceholder}
                    alt={item.title}
                    className="w-16 h-16 object-contain rounded bg-white p-1"
                  />

                  <div className="flex flex-col flex-1">
                    <h3 className="text-sm font-medium line-clamp-1">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-400">
                      {formatCentavos(item.unitPriceCentavos)} × {item.quantity}
                    </p>

                    <CartLineIssues item={item} />
                    <div className="mt-3 flex items-center gap-2">
                      <button
                        disabled={pending || loading}
                      aria-label={"Decrease quantity of " + item.title}
                      onClick={() => decrementQty(item._id)}
                        className="w-7 h-7 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:scale-90 transition rounded text-xs"
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>

                      <span className="text-sm font-medium w-5 text-center">
                        {item.quantity}
                      </span>

                      <button
                        disabled={pending || loading || !item.available || item.quantity >= item.availableStock}
                      aria-label={"Increase quantity of " + item.title}
                      onClick={() => incrementQty(item._id)}
                        className="w-7 h-7 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:scale-90 transition rounded text-xs"
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button
                      disabled={pending || loading}
                      aria-label={"Remove " + item.title}
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-400 hover:text-red-500 transition text-sm"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                    <div className="text-sm text-indigo-400 font-semibold">
                      {formatCentavos(item.lineTotalCentavos)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-white/10 p-5">
              <div className="flex justify-between mb-4">
                <span>Total</span>
                <span className="font-semibold text-indigo-400">
                  {formatCentavos(subtotalCentavos)}
                </span>
              </div>

              <Link
                to="/cart"
                onClick={onClose}
                className="w-full mb-3 border border-indigo-500 text-indigo-400 p-3 rounded-xl hover:bg-indigo-500/10 transition text-center block font-medium"
              >
                View My Cart 🛒
              </Link>

              {cartItems.length > 0 && (
                <button
                  disabled={pending || loading}
                  onClick={() => {
                    if (!pending && confirm("Clear all items in cart?")) {
                      clearCart();
                    }
                  }}
                  className="w-full mb-3 border border-red-500 text-red-400 p-2 rounded-xl hover:bg-red-500/10 transition"
                >
                  Clear Cart
                </button>
              )}

              <button
                disabled={!checkoutEligible || pending || loading}
                onClick={() => {navigate("/checkout");onClose();}}
                className="w-full disabled:opacity-50 disabled:cursor-not-allowed bg-indigo-600 p-3 rounded-xl font-semibold hover:bg-indigo-500 active:scale-95 transition text-center block"
              >
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
