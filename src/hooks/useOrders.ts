import { useState } from "react";
import type { Order } from "../types/order";

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    items: [],
    total: 1200,
    status: "pending",
    createdAt: new Date().toISOString(),
  },
];

const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);

  return { orders, setOrders };
};

export default useOrders;
