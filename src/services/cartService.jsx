// src/services/cartService.jsx
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";

// ✅ Tambahkan fungsi fetchCarts
export const fetchCarts = async () => {
  const token = Cookies.get("token");

  const res = await axios.get(`${API_URL}/carts`, {
    headers: {
      apiKey: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data.data;
};

// ✅ Fungsi untuk tambah cart
export const addCartToBackend = async ({ activityId, quantity }) => {
  const token = Cookies.get("token");

  const res = await axios.post(
    `${API_URL}/add-cart`,
    { activityId, quantity },
    {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.data;
};
