const PromoBanner: React.FC = () => {
  return (
    <section className="px-10 py-16 text-center">
      <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-14">
        <h2 className="text-3xl font-extrabold mb-4">
          Free Shipping on Orders Over ₱2,999
        </h2>
        <p className="text-indigo-100 mb-6">
          Limited time offer. Don’t miss out.
        </p>
        <button className="px-10 py-4 rounded-xl bg-black/30 font-bold hover:bg-black/50 transition">
          Start Shopping
        </button>
      </div>
    </section>
  );
};

export default PromoBanner;
