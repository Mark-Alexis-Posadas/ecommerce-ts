import axios from 'axios';
import { CartFeedback, CartLineIssues } from '../components/cart/CartFeedback';
import { formatCentavos } from '../utils/cartMoney';
import { productPlaceholder } from '../utils/productImage';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../services/orderService';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../hooks/useAuth';
import { checkoutSchema } from '../validators/checkoutSchema';

const CheckoutPage = () => {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const { cartItems, subtotalCentavos, checkoutEligible, loading, pending, refreshCart } =
    useCart();
  const [placing, setPlacing] = useState(false);
  const submitting = useRef(false);
  const [shipping, setShipping] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
  });
  const { token } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('');
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    if (submitting.current || !checkoutEligible || loading || pending) return;
    try {
      const formData = {
        ...shipping,
        paymentMethod,
      };

      const result = checkoutSchema.safeParse(formData);

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setErrors(fieldErrors);
        toast.error('Please fill in all required fields properly');

        return;
      }

      // clear errors if valid
      setErrors({});

      const orderData = {
        shippingAddress: shipping,
        paymentMethod: result.data.paymentMethod,
      };

      submitting.current = true;
      setPlacing(true);
      const res = await createOrder(orderData, token!);
      const createdOrder = res.data;
      toast.success('Order placed successfully!');
      if (createdOrder.cartClearConflict)
        toast.error(
          'Your cart changed during checkout. Review remaining items before ordering again.',
        );
      await refreshCart();

      navigate(`/orders/${createdOrder._id}`);
    } catch (error) {
      const message = axios.isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;
      toast.error(message || 'Unable to place order. Please review your cart.');
      await refreshCart();
    } finally {
      submitting.current = false;
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen px-6 md:px-10 py-12 max-w-7xl mx-auto">
      <h1 className="text-4xl font-bold mb-10">Checkout</h1>

      <CartFeedback />
      {!checkoutEligible && !loading && (
        <p className="mb-4 text-amber-300">
          Review your cart before placing an order.{' '}
          <a href="/cart" className="underline">
            Return to cart
          </a>
        </p>
      )}
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
                  onChange={(e) => setShipping({ ...shipping, firstName: e.target.value })}
                  value={shipping.firstName}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.firstName ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName[0]}</p>
                )}
              </div>

              {/* LAST NAME */}
              <div className="flex flex-col">
                <input
                  onChange={(e) => setShipping({ ...shipping, lastName: e.target.value })}
                  value={shipping.lastName}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.lastName ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName[0]}</p>
                )}
              </div>

              {/* ADDRESS (FULL WIDTH) */}
              <div className="flex flex-col md:col-span-2">
                <input
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  value={shipping.address}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.address ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Address"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address[0]}</p>}
              </div>

              {/* CITY */}
              <div className="flex flex-col">
                <input
                  onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  value={shipping.city}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.city ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="City"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city[0]}</p>}
              </div>

              {/* POSTAL */}
              <div className="flex flex-col">
                <input
                  onChange={(e) => setShipping({ ...shipping, postalCode: e.target.value })}
                  value={shipping.postalCode}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.postalCode ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Postal Code"
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-xs mt-1">{errors.postalCode[0]}</p>
                )}
              </div>

              {/* PHONE (FULL WIDTH) */}
              <div className="flex flex-col md:col-span-2">
                <input
                  onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                  value={shipping.phone}
                  className={`p-3 rounded-lg bg-black/40 border ${
                    errors.phone ? 'border-red-500' : 'border-white/10'
                  }`}
                  placeholder="Phone Number"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone[0]}</p>}
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
                    errors.paymentMethod ? 'border border-red-500' : ''
                  }`}
                  type="radio"
                  name="payment"
                  value="COD"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                Cash on Delivery
              </label>
              {errors.paymentMethod && (
                <p className="text-red-500 text-xs">{errors.paymentMethod[0]}</p>
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
                key={item.lineId}
                className="flex items-center gap-4 border-b border-white/10 pb-4"
              >
                {/* IMAGE */}
                <img
                  src={item.image || item.images[0] || productPlaceholder}
                  alt={item.title}
                  className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                />

                {/* INFO */}
                <div className="flex-1">
                  <p className="text-sm font-semibold">{item.title}</p>

                  <CartLineIssues item={item} />
                  {/* SUBTOTAL BREAKDOWN */}
                  <p className="text-xs text-gray-400">
                    {formatCentavos(item.unitPriceCentavos)} × {item.quantity}
                  </p>
                </div>

                {/* PRICE */}
                <p className="text-sm font-bold">{formatCentavos(item.lineTotalCentavos)}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg font-bold mt-6">
            <span>Total</span>
            <span>{formatCentavos(subtotalCentavos)}</span>
          </div>

          <button
            className="w-full mt-6 py-4 bg-indigo-600 rounded-xl font-bold hover:bg-indigo-500 transition"
            disabled={!checkoutEligible || pending || loading || placing}
            onClick={handlePlaceOrder}
          >
            {placing ? 'Placing order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
