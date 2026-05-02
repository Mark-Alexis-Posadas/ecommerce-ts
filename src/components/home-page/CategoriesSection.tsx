import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

type Category = {
  _id: string;
  name: string;
};

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);

        const response = await fetch(`${API_URL}/api/products/categories`);

        const data = await response.json();

        setCategories(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-400">
        Loading categories...
      </div>
    );
  }

  return (
    <section className="px-10 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>

      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/products?category=${cat._id}`}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-xl text-center hover:-translate-y-2 hover:border-indigo-500/40 transition"
          >
            <div className="text-4xl mb-2">📦</div>
            <h3 className="capitalize font-bold text-white">{cat.name}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
