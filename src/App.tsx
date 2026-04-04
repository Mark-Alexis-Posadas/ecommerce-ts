import { Routes, Route } from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccessPage";
import ProductDetails from "./pages/ProductDetails";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";

const App = () => {
  return (
    <Routes>
      {/* MAIN APP */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};

export default App;
