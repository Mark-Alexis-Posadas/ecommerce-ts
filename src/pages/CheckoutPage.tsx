import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
const CheckoutPage = () => {
  const { cartItems } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // dito pwede mo i-clear cart
    navigate("/order-success");
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

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-sm border-b border-white/10 pb-2"
              >
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>₱{item.price * item.quantity}</span>
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
