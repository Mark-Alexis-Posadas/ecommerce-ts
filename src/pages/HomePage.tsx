import HeroSection from "../components/home-page/HeroSection";
import ValueProps from "../components/home-page/ValueProps";
import CategoriesSection from "../components/home-page/CategoriesSection";
import FeaturedProducts from "../components/home-page/FeaturedProducts";
import FlashSale from "../components/home-page/FlashSale";
import BestSellers from "../components/home-page/BestSellers";
import NewArrivals from "../components/home-page/NewArrivals";
import Testimonials from "../components/home-page/Testimonials";
import PromoBanner from "../components/home-page/PromoBanner";
import FAQSection from "../components/home-page/FAQSection";
import NewsletterSignup from "../components/home-page/NewsLetterSignup";
import useProducts from "../hooks/useProducts";
const HomePage = () => {
    const newest = useProducts({ sort: "latest" });
    const featured = useProducts({ featured: true, limit: 4 });
    const best = useProducts({ sort: "best_selling" });
    return (<>
      <HeroSection />
      <ValueProps />
      <CategoriesSection />
      <FlashSale />
      <BestSellers products={best.products} loading={best.loading} error={best.error}/>
      <NewArrivals products={newest.products} loading={newest.loading} error={newest.error}/>
      <FeaturedProducts products={featured.products} loading={featured.loading} error={featured.error}/>
      <PromoBanner />
      <Testimonials />
      <FAQSection />
      <NewsletterSignup />
    </>);
};
export default HomePage;
