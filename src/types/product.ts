export type Rating = {
  rate: number;
  count: number;
};

export type Product = {
  _id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: Rating;
  createdAt: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type ProductProps = {
  products: Product[];
  loading: boolean;
  error: string | null;
};
