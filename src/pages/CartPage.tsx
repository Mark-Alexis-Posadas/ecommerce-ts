import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

const CartPage = () => {
  const { cartItems, incrementQty, decrementQty, removeFromCart, clearCart } =
    useCart();

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
    <div className="min-h-screen px-6 md:px-10 py-12 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">🛒 My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-400 mt-20">
          <p className="mb-4 text-lg">Your cart is empty...</p>
          <Link to="/" className="text-indigo-400 hover:underline text-sm">
            Browse products →
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {/* LEFT - ITEMS */}
          <div className="md:col-span-2 flex flex-col gap-5">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-white/10 transition"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-contain bg-white p-2 rounded-xl"
                />

                {/* INFO */}
                <div className="flex flex-col flex-1">
                  <h2 className="font-semibold text-lg line-clamp-1">
                    {item.title}
                  </h2>

                  <p className="text-sm text-gray-400 capitalize">
                    {item.category}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    ⭐ {item.rating?.rate} ({item.rating?.count} reviews)
                  </p>

                  {/* QTY */}
                  <div className="flex items-center gap-2 mt-4">
                    <button
                      onClick={() => decrementQty(item._id)}
                      className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:scale-90 transition rounded"
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>

                    <span className="w-6 text-center">{item.quantity}</span>

                    <button
                      onClick={() => incrementQty(item._id)}
                      className="w-8 h-8 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 active:scale-90 transition rounded"
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                  </div>

                  {/* REMOVE */}
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-400 text-sm mt-3 hover:underline"
                  >
                    <FontAwesomeIcon icon={faTrash} /> Remove
                  </button>
                </div>

                {/* PRICE */}
                <div className="flex flex-col items-end justify-between">
                  <span className="text-indigo-400 font-semibold text-lg">
                    {formatCurrency(item.price * item.quantity)}
                  </span>

                  <span className="text-xs text-gray-400">
                    {formatCurrency(item.price)} each
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 h-fit sticky top-10">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="flex justify-between mb-3 text-sm text-gray-400">
              <span>Items</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="flex justify-between mb-4 text-lg">
              <span>Total</span>
              <span className="text-indigo-400 font-semibold">
                {formatCurrency(total)}
              </span>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 mt-6">
              <Link
                to="/checkout"
                className="w-full bg-indigo-600 p-3 rounded-xl text-center font-semibold hover:bg-indigo-500 active:scale-95 transition"
              >
                Proceed to Checkout
              </Link>

              {cartItems.length > 1 && (
                <button
                  onClick={() => {
                    if (confirm("Clear all items in cart?")) {
                      clearCart();
                    }
                  }}
                  className="w-full border border-red-500 text-red-400 p-3 rounded-xl hover:bg-red-500/10 transition"
                >
                  Clear Cart
                </button>
              )}

              <Link
                to="/"
                className="text-center text-sm text-gray-400 hover:text-white transition"
              >
                ← Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
