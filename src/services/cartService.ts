import axios from "axios";

const API = "http://localhost:5000/api/cart";

export const getCart = async (token: string) => {
  return axios.get(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const addToCart = async (
  productId: string,
  quantity: number,
  token: string,
) => {
  return axios.post(
    API,
    { productId, quantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const removeFromCart = async (productId: string, token: string) => {
  return axios.delete(`${API}/${productId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const clearCart = async (token: string) => {
  return axios.delete(API, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
