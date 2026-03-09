const Navbar = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-indigo-600">ShopZone</h1>

        {/* Menu */}
        <ul className="hidden md:flex gap-8 font-medium text-gray-700">
          <li className="hover:text-indigo-600 cursor-pointer">Home</li>
          <li className="hover:text-indigo-600 cursor-pointer">Products</li>
          <li className="hover:text-indigo-600 cursor-pointer">Categories</li>
          <li className="hover:text-indigo-600 cursor-pointer">Contact</li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <input
            type="text"
            placeholder="Search..."
            className="hidden md:block border rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Cart */}
          <button className="relative text-gray-700 hover:text-indigo-600">
            🛒
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              2
            </span>
          </button>

          {/* Login */}
          <button className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition">
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
