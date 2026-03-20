type ProductItem = {
  id: number;
  name: string;
  price: number;
  category: string;
  inStock?: boolean;
};

type ProductProp = {
  product: ProductItem;
};

const ProductItemTwo = ({ product }: ProductProp) => {
  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      <p>{product.category}</p>
      <p>{product.inStock ? "Available" : "Out of stock"}</p>
    </div>
  );
};

export default ProductItemTwo;
