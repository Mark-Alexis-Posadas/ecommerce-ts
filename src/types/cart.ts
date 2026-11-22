import type { Product } from './product';
export interface CartIssue {
  productId: string;
  code:
    | 'UNAVAILABLE'
    | 'INVALID_QUANTITY'
    | 'INSUFFICIENT_STOCK'
    | 'INVALID_PRICE'
    | 'DUPLICATE_PRODUCT';
  message: string;
}
export interface CartLine {
  _id: string;
  productId: string;
  product: (Omit<Product, 'priceAfterDiscount'> & { priceAfterDiscount: number | null }) | null;
  quantity: number;
  price: number | null;
  unitPriceCentavos: number | null;
  lineTotal: number | null;
  lineTotalCentavos: number | null;
  availableStock: number;
  available: boolean;
  issues: CartIssue[];
}
export interface CartResponse {
  _id: string;
  user: string;
  version: number;
  currency: 'PHP';
  items: CartLine[];
  totalQuantity: number;
  subtotal: number;
  subtotalCentavos: number;
  checkoutEligible: boolean;
  issues: CartIssue[];
}
export type CartItemFromAPI = CartLine;
export type CartItem = Product & {
  quantity: number;
  lineId: string;
  basePrice: number;
  unitPriceCentavos: number | null;
  lineTotalCentavos: number | null;
  availableStock: number;
  available: boolean;
  issues: CartIssue[];
};
