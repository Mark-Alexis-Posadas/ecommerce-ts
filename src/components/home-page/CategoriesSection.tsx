import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoriesSection: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data: string[] = await res.json();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  return (
    <section className="px-10 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/products?category=${cat}`}
            className="bg-white/10 backdrop-blur-xl border border-white/10 p-6 rounded-xl text-center hover:-translate-y-2 hover:border-indigo-500/40 transition"
          >
            <div className="text-4xl mb-2">📦</div>
            <h3 className="capitalize font-bold text-white">{cat}</h3>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
