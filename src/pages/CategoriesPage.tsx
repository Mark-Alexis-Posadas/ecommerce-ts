import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

type Category = {
  _id: string;
  name: string;
};

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/products/categories`);

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();

        setCategories(data.data);
      } catch (error: any) {
        console.error(error);
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-400">
        Loading categories...
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-20 text-red-400">{error}</div>;
  }

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
      {categories.length === 0 ? (
        <p className="text-center text-gray-400">No categories found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/products?category=${category._id}`}
              className="group rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 p-8 text-center hover:-translate-y-2 hover:border-indigo-500/40 transition"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">📦</div>

              {/* Category Name */}
              <h3 className="text-xl font-bold text-white capitalize">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoriesPage;
