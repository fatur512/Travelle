// src/services/cartService.jsx
import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";

// Ambil token dari cookies
const getToken = () => {
  const token = Cookies.get("token");
  if (!token) {
    console.error("❌ Token tidak ditemukan di cookies.");
    throw new Error("Kamu belum login.");
  }
  return token;
};

// Ambil cart dari backend
export const fetchCarts = async () => {
  const token = getToken();

  try {
    const res = await axios.get(`${API_URL}/carts`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = res?.data?.data;

    if (!Array.isArray(data)) {
      console.error("❌ Format data cart tidak valid:", res.data);
      throw new Error("Data cart tidak valid");
    }

    return data;
  } catch (error) {
    console.error("❌ Gagal mengambil data cart:", error.response?.data || error.message);
    throw new Error("Gagal mengambil data cart. Silakan coba lagi nanti.");
  }
};

// Tambahkan item ke cart
export const addCartToBackend = async ({ activityId, quantity }) => {
  const token = getToken();

  try {
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

    return res.data?.data;
  } catch (error) {
    console.error("❌ Gagal menambahkan ke cart:", error.response?.data || error.message);
    throw new Error("Gagal menambahkan ke cart.");
  }
};

// Hapus item dari cart
export const deleteCart = async (cartId) => {
  const token = getToken();

  try {
    const res = await axios.delete(`${API_URL}/delete-cart/${cartId}`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("❌ Gagal menghapus item dari cart:", error.response?.data || error.message);
    throw new Error("Gagal menghapus item dari cart.");
  }
};

// Update quantity item di cart
// src/services/cartService.jsx
export const updateCartQuantity = async (cartId, quantity) => {
  const token = Cookies.get("token");
  if (!token) {
    throw new Error("Token tidak ditemukan. Silakan login dulu.");
  }

  try {
    const res = await axios.post(
      // <- PASTIKAN ini POST, bukan PUT
      `${API_URL}/update-cart/${cartId}`,
      { quantity },
      {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return res.data;
  } catch (error) {
    // ✅ Cetak log lengkap ke console
    console.error("❌ updateCartQuantity FAILED", {
      url: `${API_URL}/update-cart/${cartId}`,
      quantity,
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    throw new Error("Gagal memperbarui jumlah item.");
  }
};
