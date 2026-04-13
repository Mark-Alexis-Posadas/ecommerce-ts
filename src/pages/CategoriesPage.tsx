import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const CategoriesPage = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/products/categories`);
        const data = await response.json();

        setCategories(data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <section className="px-10 py-16 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-3">Browse Categories</h1>
        <p className="text-gray-400">
          Explore our product collections by category.
        </p>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {categories.map((category) => (
          <Link
            key={category}
            to={`/products?category=${category}`}
            className="group rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 text-center hover:-translate-y-2 hover:border-indigo-500/40 transition"
          >
            {/* Icon */}
            <div className="text-4xl mb-4">📦</div>

            {/* Category Name */}
            <h3 className="text-xl font-bold text-white capitalize">
              {category}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesPage;
