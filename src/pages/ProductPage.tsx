import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import useProducts from "../hooks/useProducts";
import Pagination from "../components/ui/Pagination";
const ProductPage = () => {
  const { products, loading, error } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  };

  const filteredProducts = useMemo(() => {
    let items = products;

    // filter by category
    if (category) {
      items = items.filter((product) => product.category === category);
    }

    // search
    items = items.filter((product) => {
      const title = product.title || "";
      return title.toLowerCase().includes(searchQuery.toLowerCase());
    });
    // sorting
    if (sortOption === "low_to_high") {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high_to_low") {
      items = [...items].sort((a, b) => b.price - a.price);
    } else if (sortOption === "top_rated") {
      items = [...items].sort((a, b) => b.rating.rate - a.rating.rate);
    }

    return items;
  }, [products, searchQuery, sortOption, category]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  if (loading) return <p className="text-center">Loading products...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <section className="px-10 py-16 max-w-7xl mx-auto">
      {/* Breadcrumb */}
      <nav className="text-gray-400 text-sm mb-2" aria-label="breadcrumb">
        <ol className="flex space-x-2">
          <li>
            <Link to="/" className="hover:text-indigo-500">
              Home
            </Link>
            <span>/</span>
          </li>
          <li>
            <Link to="/products" className="hover:text-indigo-500">
              Products
            </Link>
            <span>{category ? "/" : ""}</span>
          </li>
          {category && <li className="capitalize text-white">{category}</li>}
        </ol>
      </nav>
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          {category ? category.toUpperCase() : "All Products"}
        </h1>
        <p className="text-gray-400">
          Discover our curated collection of premium products.
        </p>
      </div>

      {/* Filters */}
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
          onChange={(e) => handleSortChange(e.target.value)}
          className="rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm text-gray-300 focus:outline-none"
        >
          <option value="none">Sort by</option>
          <option value="low_to_high">Price: Low to High</option>
          <option value="high_to_low">Price: High to Low</option>
          <option value="top_rated">Top Rated</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {paginatedProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </section>
  );
};

export default ProductPage;
