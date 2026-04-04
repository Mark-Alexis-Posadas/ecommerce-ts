import type { Product } from "../../types/product";
import ProductSection from "../product/ProductSection";
type Props = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const BestSellers = ({ products, loading, error }: Props) => {
  const bestSellers = products.filter((p) => p.rating.rate >= 4);

  return (
    <ProductSection
      title="🔥 Best Sellers"
      products={bestSellers}
      loading={loading}
      error={error}
    />
  );
};

export default BestSellers;
