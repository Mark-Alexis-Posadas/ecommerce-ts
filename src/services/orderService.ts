import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const createOrder = async (orderData: any, token: string) => {
  return axios.post(API_URL, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMyOrders = async (token: string) => {
  return axios.get(`${API_URL}/api/orders/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getOrderById = async (id: string, token: string) => {
  return axios.get(`${API_URL}/api/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
