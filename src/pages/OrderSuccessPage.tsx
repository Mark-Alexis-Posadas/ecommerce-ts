import { Link } from "react-router-dom";

const Page = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <div className="bg-white/5 p-10 rounded-2xl border border-white/10 max-w-lg">
        <h1 className="text-4xl font-bold mb-4">🎉 Order Successful!</h1>

        <p className="text-gray-300 mb-6">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        <p className="text-sm text-gray-400 mb-8">Order #392184</p>

        <Link
          to="/products"
          className="px-6 py-3 bg-indigo-600 rounded-xl font-semibold hover:bg-indigo-500 transition"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Page;
