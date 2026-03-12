import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import { useMemo, useState } from "react";
import type { Product } from "../types/product";
type CartType = {
  handleAddToCart: (product: Product) => void;
};
const ProductPage = ({ handleAddToCart }: CartType) => {
  const [searchQuery, setSearchQuery] = useState("");

  const [sortOption, setSortOption] = useState("none");

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
  };

  const filteredProducts = useMemo(() => {
    let items = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortOption === "low_to_high") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high_to_low") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortOption === "top_rated") {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }

    return items;
  }, [searchQuery, sortOption]);

  return (
    <section className="px-10 py-16 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">All Products</h1>
        <p className="text-gray-400">
          Discover our curated collection of premium products.
        </p>
      </div>

      {/* Filters / Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
        {/* Search */}
        <input
          onChange={handleSearchProduct}
          value={searchQuery}
          type="text"
          placeholder="Search products..."
          className="w-full md:w-[300px] rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm text-gray-300 focus:outline-none"
        >
          <option>Sort by</option>
          <option value="low_to_high">Price: Low to High</option>
          <option value="high_to_low">Price: High to Low</option>
          <option value="top_rated">Top Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            handleAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductPage;
