import HeroSection from "../components/home-page/HeroSection";
import ValueProps from "../components/home-page/ValueProps";
import CategoriesSection from "../components/home-page/CategoriesSection";
import FeaturedProducts from "../components/home-page/FeaturedProducts";
import ProductsGrid from "../components/home-page/ProductsGrid";
import FlashSale from "../components/home-page/FlashSale";
import Testimonials from "../components/home-page/Testimonials";

import PromoBanner from "../components/home-page/PromoBanner";

import NewsletterSignup from "../components/home-page/NewsLetterSignup";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <ValueProps />
      <CategoriesSection />
      <FlashSale />
      <FeaturedProducts />
      <ProductsGrid />
      <Testimonials />
      <PromoBanner />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;
