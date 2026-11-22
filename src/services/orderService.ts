import { api as axios } from './api';
import type { CreateOrderRequest, OrderResponse } from '../types/order';

const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (orderData: CreateOrderRequest, token: string) => {
  return axios.post<OrderResponse>(`${API_URL}/api/orders`, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMyOrders = async (token: string) => {
  return axios.get<OrderResponse[]>(`${API_URL}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getOrderById = async (id: string, token: string) => {
  return axios.get<OrderResponse>(`${API_URL}/api/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
