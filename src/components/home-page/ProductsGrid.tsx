import { useMemo, useState } from "react";

import useProducts from "../../hooks/useProducts";
import ProductCard from "../product/ProductCard";
import Section from "../layout/Section";
import Container from "../layout/Container";
import type { Product } from "../../types/product";

type Props = {
  product: Product;
  cartItems: CartItem[];
  handleAddToCart: (product: Product) => void;
  incrementQty: (id: number) => void;
  decrementQty: (id: number) => void;
};

const ProductsGrid = ({
  handleAddToCart,
  cartItems,
  incrementQty,
  decrementQty,
}: Props) => {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("none");

  const filteredProducts = useMemo(() => {
    let items = products.filter((p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    if (sortOption === "low_to_high")
      items = [...items].sort((a, b) => a.price - b.price);
    if (sortOption === "high_to_low")
      items = [...items].sort((a, b) => b.price - a.price);
    if (sortOption === "top_rated")
      items = [...items].sort((a, b) => b.rating.rate - a.rating.rate);

    return items;
  }, [products, searchQuery, sortOption]);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <Section>
      <Container>
        <div className="flex flex-col md:flex-row md:justify-between items-center mb-6 gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/10 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full md:w-[300px]"
          />
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 border border-white/10 focus:outline-none"
          >
            <option value="none">Sort by</option>
            <option value="low_to_high">Price: Low to High</option>
            <option value="high_to_low">Price: High to Low</option>
            <option value="top_rated">Top Rated</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              cartItems={cartItems}
              handleAddToCart={handleAddToCart}
              incrementQty={incrementQty}
              decrementQty={decrementQty}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default ProductsGrid;
