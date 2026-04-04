import useOrders from "../hooks/useOrders";

const OrdersPage = () => {
  const { orders } = useOrders();

  return (
    <div className="min-h-screen px-6 md:px-10 py-12 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-10 text-white">📦 My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-400">No orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white/5 p-6 rounded-2xl border border-white/10 shadow-lg"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-400">Order ID: {order.id}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 text-xs rounded-full font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : order.status === "shipped"
                        ? "bg-blue-500/20 text-blue-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* ITEMS */}
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex items-center gap-4 border-b border-white/10 pb-4"
                  >
                    <img
                      src={item.image}
                      className="w-14 h-14 object-contain bg-white rounded-lg p-2"
                    />

                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.quantity} × ₱{item.price}
                      </p>
                    </div>

                    <p className="text-sm font-bold text-white">
                      ₱{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="flex justify-between mt-4 font-bold text-white">
                <span>Total</span>
                <span>₱{order.total}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
