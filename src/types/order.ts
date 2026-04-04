export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "shipped" | "delivered";
  createdAt: string;
};
