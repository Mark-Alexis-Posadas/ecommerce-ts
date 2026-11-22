import { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import useProducts from '../hooks/useProducts';
import Pagination from '../components/ui/Pagination';
const ProductPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('none');
  const itemsPerPage = 8;
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const {
    products,
    loading,
    error,
    page: currentPage,
    setPage: setCurrentPage,
    meta,
  } = useProducts({
    search: searchQuery,
    sort: sortOption,
    category: category || '',
    limit: itemsPerPage,
  });
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };
  const handleSortChange = (value: string) => {
    setSortOption(value);
    setCurrentPage(1);
  };
  const totalPages = meta?.totalPages || 0;
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
            <span>{category ? '/' : ''}</span>
          </li>
          {category && <li className="capitalize text-white">{category}</li>}
        </ol>
      </nav>
      {/* Page Header */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-3">
          {category ? category.toUpperCase() : 'All Products'}
        </h1>
        <p className="text-gray-400">Discover our curated collection of premium products.</p>
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
          <option value="latest">Newest</option>
          <option value="best_selling">Best Sellers</option>
        </select>
      </div>

      {!products.length && <p>No products found.</p>}
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.map((product) => (
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
