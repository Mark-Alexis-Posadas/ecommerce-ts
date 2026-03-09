import React from "react";

const ValueProps: React.FC = () => {
  return (
    <section className="px-10 py-20 bg-white/5">
      <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-10 text-center">
        <div>
          <h3 className="text-xl font-bold mb-2">🚚 Fast Delivery</h3>
          <p className="text-sm text-gray-400">
            Quick and reliable shipping nationwide.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">🔒 Secure Payment</h3>
          <p className="text-sm text-gray-400">100% secure checkout process.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">⭐ Top Quality</h3>
          <p className="text-sm text-gray-400">Hand-picked premium products.</p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">💬 Support</h3>
          <p className="text-sm text-gray-400">
            Friendly customer service anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
