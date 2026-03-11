import { Link } from "react-router-dom";

const categories = ["Shoes", "Clothing", "Electronics"];
const CategoriesSection: React.FC = () => {
  return (
    <section className="px-10 py-16">
      <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/products?category=${cat}`}
            className="h-32 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-xl flex items-center justify-center text-lg font-semibold hover:bg-indigo-500/20 transition cursor-pointer"
          >
            {cat}
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
