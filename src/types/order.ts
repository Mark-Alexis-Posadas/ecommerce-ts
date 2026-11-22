import type { CartItem } from './product';

export type ShippingAddress = {
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  firstName?: string;
  lastName?: string;
};

// API snapshots differ from the legacy order-history view model below.
export type OrderResponse = {
  _id: string;
  orderItems: {
    _id?: string;
    product?: string;
    name?: string;
    qty: number;
    price: number;
    image?: string;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD';
  totalPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  cartClearConflict?: boolean;
};

export type CreateOrderRequest = {
  shippingAddress: ShippingAddress;
  paymentMethod: 'COD';
};

export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'shipped' | 'delivered';
  createdAt: string;
};
