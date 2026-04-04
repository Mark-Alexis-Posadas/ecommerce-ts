import { useCart } from "../hooks/useCart";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    // TODO: save to state / context / backend

    navigate("/orders");
  };

  return (
    <div className="min-h-screen px-6 md:px-10 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-10">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <input
                className="p-3 rounded-lg bg-black/40 border border-white/10"
                placeholder="First Name"
              />
              <input
                className="p-3 rounded-lg bg-black/40 border border-white/10"
                placeholder="Last Name"
              />
              <input
                className="p-3 rounded-lg bg-black/40 border border-white/10 md:col-span-2"
                placeholder="Address"
              />
              <input
                className="p-3 rounded-lg bg-black/40 border border-white/10"
                placeholder="City"
              />
              <input
                className="p-3 rounded-lg bg-black/40 border border-white/10"
                placeholder="Postal Code"
              />
              <input
                className="p-3 rounded-lg bg-black/40 border border-white/10 md:col-span-2"
                placeholder="Phone Number"
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input type="radio" name="payment" />
                Cash on Delivery
              </label>

              <label className="flex items-center gap-3">
                <input type="radio" name="payment" />
                Credit / Debit Card
              </label>

              <label className="flex items-center gap-3">
                <input type="radio" name="payment" />
                GCash
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white/5 p-6 rounded-xl border border-white/10 h-fit">
          <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 border-b border-white/10 pb-4"
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                />

                {/* INFO */}
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>

                  {/* SUBTOTAL BREAKDOWN */}
                  <p className="text-xs text-gray-400">
                    ₱{item.price} × {item.quantity}
                  </p>
                </div>

                {/* PRICE */}
                <p className="text-sm font-bold">
                  ₱{item.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold mt-6">
            <span>Total</span>
            <span>₱{total}</span>
          </div>

          <button
            className="w-full mt-6 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
