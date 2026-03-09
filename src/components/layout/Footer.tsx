const Footer = () => {
  return (
    <footer className=" mt-16 border-t border-white/10 text-sm text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">ShopZone</h2>
          <p className="text-sm">
            Your trusted online store for quality products and great deals.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">All Products</li>
            <li className="hover:text-white cursor-pointer">New Arrivals</li>
            <li className="hover:text-white cursor-pointer">Best Sellers</li>
            <li className="hover:text-white cursor-pointer">Discounts</li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-white cursor-pointer">Help Center</li>
            <li className="hover:text-white cursor-pointer">Returns</li>
            <li className="hover:text-white cursor-pointer">Shipping Info</li>
            <li className="hover:text-white cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <span className="hover:text-white cursor-pointer">📘</span>
            <span className="hover:text-white cursor-pointer">📸</span>
            <span className="hover:text-white cursor-pointer">🐦</span>
          </div>
        </div>
      </div>

      <div className="text-center text-sm border-t border-white/10 py-4">
        © 2026 ShopZone. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
