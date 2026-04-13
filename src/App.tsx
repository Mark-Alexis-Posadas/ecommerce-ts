import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
// layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// pages
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CategoriesPage from "./pages/CategoriesPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import OrdersPage from "./pages/OrdersPage";
import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <Routes>
      {/* MAIN APP */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccessPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Route>

      {/* AUTH */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
  );
};

export default App;
