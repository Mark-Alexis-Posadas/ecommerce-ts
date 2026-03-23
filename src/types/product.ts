export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: Rating;
};

export type CartItem = Product & {
  quantity: number;
};

export type ProductProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};
