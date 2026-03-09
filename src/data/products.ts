import type { Product } from "../types/product";

export const products: Product[] = [
  {
    id: 1,
    name: "Nike Air Zoom",
    price: 5990,
    category: "Shoes",
    image: "/images/shoe1.jpg",
    description: "Comfortable running shoes",
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 6990,
    category: "Shoes",
    image: "/images/shoe2.jpg",
    description: "High performance running shoe",
  },
  {
    id: 3,
    name: "Uniqlo Oversized Shirt",
    price: 1290,
    category: "Clothing",
    image: "/images/shirt1.jpg",
    description: "Minimalist casual shirt",
  },
  {
    id: 4,
    name: "Apple AirPods Pro",
    price: 14990,
    category: "Electronics",
    image: "/images/airpods.jpg",
    description: "Noise cancelling earbuds",
  },
];
