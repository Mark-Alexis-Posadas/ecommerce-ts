import type { Product } from "../../types/product";
import ProductSection from "../product/ProductSection";

type Props = {
  products: Product[];
  loading: boolean;
  error: string | null;
};

const NewArrivals = ({ products, loading, error }: Props) => {
  const newArrivals = [...products].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <ProductSection
      title="🆕 New Arrivals"
      products={newArrivals}
      loading={loading}
      error={error}
    />
  );
};

export default NewArrivals;
