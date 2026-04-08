import axios from "axios";

const API = "/api/orders";

export const createOrder = async (orderData: any, token: string) => {
  return axios.post(API, orderData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getMyOrders = async (token: string) => {
  return axios.get(`${API}/my`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const getOrderById = async (id: string, token: string) => {
  return axios.get(`${API}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
