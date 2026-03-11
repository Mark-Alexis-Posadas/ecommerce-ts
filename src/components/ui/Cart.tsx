import type { CartItem } from "../../types/product";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
};
const Cart = ({ isOpen, onClose, cartItems }: CartProps) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-95 bg-white shadow-lg z-50 transform transition-transform duration-300
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
                <p className="text-sm text-gray-500">${item.price}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 w-full border-t p-4">
        <button className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
