// services/LoggedUser.js
import axios from "axios";
import Cookies from "js-cookie";
import { API_KEY, API_URL } from "../config/env";

// ✅ Ambil data user login
export const fetchLoggedUser = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No token found");

    const res = await axios.get(`${API_URL}/user`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data.data;
  } catch (error) {
    console.error("Gagal mengambil data user:", error?.response?.data || error.message);
    throw error;
  }
};

// ✅ Update data user login
export const updateLoggedUser = async (userData) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No token found");

    const res = await axios.post(`${API_URL}/update-profile`, userData, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res.data.data;
  } catch (error) {
    console.error("Gagal memperbarui data user:", error?.response?.data || error.message);
    throw error;
  }
};
