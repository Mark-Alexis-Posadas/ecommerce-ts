export type Rating = {
    rate: number;
    count: number;
};
export type Category = {
    _id: string;
    name: string;
    createdAt?: string;
    updatedAt?: string;
};
export type Product = {
    discount?: number;
    priceAfterDiscount?: number;
    brand?: string;
    isActive?: boolean;
    isFeatured?: boolean;
    sold?: number;
    _id: string;
    title: string;
    price: number;
    category: Category | string | null;
    image?: string;
    images: string[];
    description: string;
    rating: Rating;
    stock: number;
    createdAt: string;
};
export type { CartItem, CartItemFromAPI, CartResponse } from "./cart";
export type ProductsResponse = {
    data: Product[];
    meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
};
export type ProductProps = {
    products: Product[];
    loading: boolean;
    error: string | null;
};
