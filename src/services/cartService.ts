import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
export const getCart = async (token: string) => {
  return axios.get(`${API_URL}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToCart = async (
  productId: string,
  quantity: number,
  token: string,
) => {
  return axios.post(
    `${API_URL}/api/cart`,
    { productId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const removeFromCart = async (productId: string, token: string) => {
  return axios.delete(`${API_URL}/api/cart/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const clearCart = async (token: string) => {
  return axios.delete(`${API_URL}/api/cart`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
