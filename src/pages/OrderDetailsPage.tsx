import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/orderService";
import { useAuth } from "../hooks/useAuth";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await getOrderById(id!, user.token);
      setOrder(res.data);
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading order...
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 md:px-10 py-12 max-w-6xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-10">📦 Order Details</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-6">
          {/* ORDER INFO */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-sm text-gray-400">Order ID: {order._id}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <span className="px-3 py-1 text-xs rounded-full font-semibold bg-yellow-500/20 text-yellow-400">
                {order.status || "pending"}
              </span>
            </div>
          </div>

          {/* ITEMS */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-xl font-semibold mb-6">Items</h2>

            <div className="space-y-4">
              {order.orderItems.map((item: any) => (
                <div
                  key={item.product}
                  className="flex items-center gap-4 border-b border-white/10 pb-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-contain bg-white rounded-lg p-2"
                  />

                  <div className="flex-1">
                    <p className="text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {item.qty} × ₱{item.price}
                    </p>
                  </div>

                  <p className="text-sm font-bold">₱{item.qty * item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-6">
          {/* SHIPPING */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">🚚 Shipping Info</h2>

            <p>
              {order.shippingAddress.firstName} {order.shippingAddress.lastName}
            </p>
            <p className="text-sm text-gray-400">
              {order.shippingAddress.address}
            </p>
            <p className="text-sm text-gray-400">
              {order.shippingAddress.city}
            </p>
            <p className="text-sm text-gray-400">
              {order.shippingAddress.phone}
            </p>
          </div>

          {/* PAYMENT */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">💳 Payment</h2>

            <p className="text-sm">{order.paymentMethod}</p>
          </div>

          {/* TOTAL */}
          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>₱{order.totalPrice}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
