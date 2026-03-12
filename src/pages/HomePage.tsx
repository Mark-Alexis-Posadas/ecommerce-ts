import ProductsGrid from "../components/home-page/ProductsGrid";
import HeroSection from "../components/home-page/HeroSection";
import FeaturedProducts from "../components/home-page/FeaturedProducts";
import CategoriesSection from "../components/home-page/CategoriesSection";
import ValueProps from "../components/home-page/ValueProps";
import PromoBanner from "../components/home-page/PromoBanner";
import type { Product } from "../types/product";

type CartType = {
  handleAddToCart: (product: Product) => void;
};

const HomePage = ({ handleAddToCart }: CartType) => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts handleAddToCart={handleAddToCart} />
      <CategoriesSection />
      <ProductsGrid handleAddToCart={handleAddToCart} />
      <ValueProps />
      <PromoBanner />
    </>
  );
};

export default HomePage;
