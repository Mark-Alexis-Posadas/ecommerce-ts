import type { CartLine, CartItem } from '../types/cart';
export const mapCartItems = (items: CartLine[]): CartItem[] =>
  items.map((item) => ({
    _id: item.productId,
    title: 'Unavailable product',
    description: '',
    images: [],
    category: null,
    rating: { rate: 0, count: 0 },
    stock: 0,
    createdAt: '',
    ...item.product,
    priceAfterDiscount: item.price ?? undefined,
    price: item.price ?? 0,
    basePrice: item.product?.price ?? 0,
    quantity: item.quantity,
    lineId: item._id,
    unitPriceCentavos: item.unitPriceCentavos,
    lineTotalCentavos: item.lineTotalCentavos,
    availableStock: item.availableStock,
    available: item.available,
    issues: item.issues,
  }));
