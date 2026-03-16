import { Link } from "react-router-dom";
import Cart from "../ui/Cart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSun } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { cartItems } = useCart();

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 mb-5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-indigo-600">
            ShopZone
          </Link>

          {/* Menu */}
          <ul className="hidden md:flex gap-8 font-medium text-gray-700">
            <li>
              <Link
                to="/"
                className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/products"
                className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition"
              >
                Products
              </Link>
            </li>

            <li>
              <Link
                to="/categories"
                className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="hidden md:block text-sm font-medium text-gray-300 hover:text-white transition"
              >
                Contact
              </Link>
            </li>
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-xl bg-white/10 border border-white/10 px-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {/* Cart */}
            <button
              className="relative text-gray-700 hover:text-indigo-600"
              onClick={() => setIsCartOpen(true)}
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-white" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Login */}
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-1.5 rounded-lg hover:bg-indigo-700 transition"
            >
              Login
            </Link>

            <button className="relative text-gray-700 hover:text-indigo-600">
              <FontAwesomeIcon icon={faSun} className="text-white" />
            </button>
          </div>
        </div>
      </nav>
      <Cart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Navbar;
