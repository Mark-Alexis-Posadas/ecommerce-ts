import ProductCard from "../product/ProductCard";

import type { Product } from "../../types/product";

const FeaturedProducts = ({ products, loading, error }) => {
  // example: pick top 4 rated products as featured
  const featured: Product[] = products
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);

  if (loading)
    return <p className="text-center">Loading featured products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="px-10 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">
        🔥 Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
