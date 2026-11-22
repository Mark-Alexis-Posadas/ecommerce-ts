import { api } from './api';
import type { CartResponse } from '../types/cart';
const headers = (token: string) => ({ Authorization: 'Bearer ' + token });
export const getCart = (token: string) =>
  api.get<CartResponse>('/api/cart', { headers: headers(token) });
export const addToCart = (productId: string, quantity: number, token: string) =>
  api.post<CartResponse>('/api/cart', { productId, quantity }, { headers: headers(token) });
export const incrementQty = (productId: string, token: string) =>
  api.put<CartResponse>('/api/cart/increment', { productId }, { headers: headers(token) });
export const decrementQty = (productId: string, token: string) =>
  api.put<CartResponse>('/api/cart/decrement', { productId }, { headers: headers(token) });
export const removeFromCart = (productId: string, token: string) =>
  api.delete<CartResponse>('/api/cart/' + productId, { headers: headers(token) });
export const clearCart = (token: string) =>
  api.delete<CartResponse>('/api/cart', { headers: headers(token) });
