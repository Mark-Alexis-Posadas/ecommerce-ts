import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { checkoutSchema } from "../validators/checkoutSchema";

const CheckoutPage = () => {
  const [errors, setErrors] = useState<any>({});
  const { cartItems } = useCart();
  const [shipping, setShipping] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("");
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    try {
      const formData = {
        ...shipping,
        paymentMethod,
      };

      const result = checkoutSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors(fieldErrors);
        toast.error("Please fill in all required fields properly");

        return;
      }

      // clear errors if valid
      setErrors({});

      const orderData = {
        shippingAddress: shipping,
        paymentMethod,
      };

      const res = await createOrder(orderData, user.token);
      const createdOrder = res.data;
      toast.success("Order placed successfully!");

      navigate(`/orders/${createdOrder._id}`);
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      console.error("❌ Error creating order:", err);
    }
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
              {/* FIRST NAME */}
              <div className="flex flex-col">
                <input
                  onChange={(e) =>
                    setShipping({ ...shipping, firstName: e.target.value })
                  }
                  value={shipping.firstName}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.firstName ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName[0]}
                  </p>
                )}
              </div>

              {/* LAST NAME */}
              <div className="flex flex-col">
                <input
                  onChange={(e) =>
                    setShipping({ ...shipping, lastName: e.target.value })
                  }
                  value={shipping.lastName}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.lastName ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.lastName[0]}
                  </p>
                )}
              </div>

              {/* ADDRESS (FULL WIDTH) */}
              <div className="flex flex-col md:col-span-2">
                <input
                  onChange={(e) =>
                    setShipping({ ...shipping, address: e.target.value })
                  }
                  value={shipping.address}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.address ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="Address"
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address[0]}
                  </p>
                )}
              </div>

              {/* CITY */}
              <div className="flex flex-col">
                <input
                  onChange={(e) =>
                    setShipping({ ...shipping, city: e.target.value })
                  }
                  value={shipping.city}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.city ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="City"
                />
                {errors.city && (
                  <p className="text-red-500 text-xs mt-1">{errors.city[0]}</p>
                )}
              </div>

              {/* POSTAL */}
              <div className="flex flex-col">
                <input
                  onChange={(e) =>
                    setShipping({ ...shipping, postalCode: e.target.value })
                  }
                  value={shipping.postalCode}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.postalCode ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="Postal Code"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.postalCode[0]}
                  </p>
                )}
              </div>

              {/* PHONE (FULL WIDTH) */}
              <div className="flex flex-col md:col-span-2">
                <input
                  onChange={(e) =>
                    setShipping({ ...shipping, phone: e.target.value })
                  }
                  value={shipping.phone}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.phone ? "border-red-500" : "border-white/10"
                  }`}
                  placeholder="Phone Number"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white/5 p-6 rounded-xl border border-white/10">
            <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  className={`space-y-3 p-3 rounded-lg ${
                    errors.paymentMethod ? "border border-red-500" : ""
                  }`}
                  type="radio"
                  name="payment"
                  value="COD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery Cash on Delivery
              </label>
              {errors.paymentMethod && (
                <p className="text-red-500 text-xs">
                  {errors.paymentMethod[0]}
                </p>
              )}

              <label className="flex items-center gap-3">
                <input
                  className={`space-y-3 p-3 rounded-lg ${
                    errors.paymentMethod ? "border border-red-500" : ""
                  }`}
                  type="radio"
                  name="payment"
                  value="CARD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Credit / Debit Card Credit / Debit Card
              </label>
              {errors.paymentMethod && (
                <p className="text-red-500 text-xs">
                  {errors.paymentMethod[0]}
                </p>
              )}

              <label className="flex items-center gap-3">
                <input
                  className={`space-y-3 p-3 rounded-lg ${
                    errors.paymentMethod ? "border border-red-500" : ""
                  }`}
                  type="radio"
                  name="payment"
                  value="GCASH"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                GCash GCash
              </label>
              {errors.paymentMethod && (
                <p className="text-red-500 text-xs">
                  {errors.paymentMethod[0]}
                </p>
              )}
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
