import type { Product } from "../../types/product";
import ProductCard from "../product/ProductCard";

type Props = {
  title: string;
  products: Product[];
  loading: boolean;
  error: string | null;
};

const ProductSection = ({ title, products, loading, error }: Props) => {
  return (
    <section className="px-6 lg:px-12 py-12">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
          {title}
        </h2>

        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-semibold">
          View All →
        </button>
      </div>

      {/* STATES */}
      {loading && <p className="text-gray-400">Loading products...</p>}

      {error && <p className="text-red-400">{error}</p>}

      {/* GRID */}
      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.slice(0, 10).map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductSection;
