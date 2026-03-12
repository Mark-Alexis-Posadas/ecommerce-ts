import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="px-10 py-20 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
        Shop Smarter. <span className="text-indigo-500">Live Better.</span>
      </h1>

      <p className="max-w-2xl mx-auto text-gray-300 text-lg mb-10">
        Discover premium products crafted to elevate your everyday life. Curated
        quality. Honest pricing.
      </p>

      <div className="flex justify-center gap-4">
        <Link
          to="/products"
          className="px-8 py-4 rounded-xl bg-indigo-600 font-bold tracking-wide hover:bg-indigo-500 transition"
        >
          Shop Now
        </Link>

        <Link
          to="/categories"
          className="px-8 py-4 rounded-xl border border-white/20 text-gray-200 hover:bg-white/10 transition"
        >
          Browse Categories
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
