import { products } from "../data/products";
import ProductCard from "../components/product/ProductCard";
import Section from "../components/layout/Section";
import Container from "../components/layout/Container";
import HeroSection from "../components/home-page/HeroSection";
import FeaturedProducts from "../components/home-page/FeaturedProducts";
import CategoriesSection from "../components/home-page/CategoriesSection";
import ValueProps from "../components/home-page/ValueProps";
import PromoBanner from "../components/home-page/PromoBanner";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CategoriesSection />
      <ValueProps />
      <PromoBanner />
      <Section>
        <Container>
          <h1>Products</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
};

export default HomePage;
