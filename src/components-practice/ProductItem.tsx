type Product = {
  title: string;
  price: number;
  inStock?: boolean;
};

type ProductProps = {
  product: Product;
};

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    category: "Electronics",
    inStock: true,
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    category: "Accessories",
    inStock: false,
  },
  {
    id: 4,
    name: "Keyboard",
    price: 70,
    category: "Accessories",
    inStock: true,
  },
];

const ProductItem = ({ product }: ProductProps) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.price}</p>
      <span>{product.inStock ? "Available" : "Out of stock"}</span>
    </div>
  );
};

export default ProductItem;
