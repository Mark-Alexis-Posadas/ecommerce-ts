import type { CartItem } from "../../types/product";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
};
const Cart = ({ isOpen, onClose, cartItems }: CartProps) => {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[380px] bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b p-4">
        <h2 className="text-lg font-semibold">Your Cart</h2>
        <button
          onClick={onClose}
          className="text-xl font-bold hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Cart Items */}
      <div className="p-4 flex flex-col gap-4 overflow-y-auto h-[70%]">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex gap-3 border-b pb-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded"
              />

              <div className="flex flex-col flex-1">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-400">
                  ${item.price} × {item.quantity}
                </p>
              </div>

              <div className="text-sm text-indigo-400 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t border-white/10 p-5">
        <div className="flex justify-between mb-4 text-white">
          <span>Total</span>
          <span className="font-semibold text-indigo-400">
            ${total.toFixed(2)}
          </span>
        </div>

        <button className="w-full bg-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-500 transition">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
