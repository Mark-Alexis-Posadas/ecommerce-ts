import HeroSection from "../components/home-page/HeroSection";
import ValueProps from "../components/home-page/ValueProps";
import CategoriesSection from "../components/home-page/CategoriesSection";
import FeaturedProducts from "../components/home-page/FeaturedProducts";
import FlashSale from "../components/home-page/FlashSale";
import BestSellers from "../components/home-page/BestSellers";
import NewArrivals from "../components/home-page/NewArrivals";
import Testimonials from "../components/home-page/Testimonials";
import PromoBanner from "../components/home-page/PromoBanner";
import FAQSection from "../components/home-page/FaqSection";
import NewsletterSignup from "../components/home-page/NewsLetterSignup";
import useProducts from "../hooks/useProducts";

const HomePage = () => {
  const { products, loading, error } = useProducts();
  return (
    <>
      <HeroSection />
      <ValueProps />
      <CategoriesSection />
      <FlashSale />
      <BestSellers products={products} loading={loading} error={error} />
      <NewArrivals products={products} loading={loading} error={error} />
      <FeaturedProducts products={products} loading={loading} error={error} />
      <PromoBanner />
      <Testimonials />
      <FAQSection />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;
