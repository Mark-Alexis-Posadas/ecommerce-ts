import ProductsGrid from "../components/home-page/ProductsGrid";
import HeroSection from "../components/home-page/HeroSection";
import FeaturedProducts from "../components/home-page/FeaturedProducts";
import CategoriesSection from "../components/home-page/CategoriesSection";
import ValueProps from "../components/home-page/ValueProps";
import PromoBanner from "../components/home-page/PromoBanner";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts handleAddToCart={handleAddToCart} />
      <CategoriesSection />
      <ProductsGrid />
      <ValueProps />
      <PromoBanner />
    </>
  );
};

export default HomePage;
