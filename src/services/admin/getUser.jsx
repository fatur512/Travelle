import axios from "axios";
import Cookies from "js-cookie";
import { API_KEY, API_URL } from "../../config/env";

export const getAllUsers = async () => {
  try {
    const token = Cookies.get("token");
    const response = await axios.get(`${API_URL}/all-user`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`,
      },
    });

    const data = response.data?.data;

    // Jika data adalah 1 objek, bungkus dalam array
    if (Array.isArray(data)) {
      return data;
    } else if (typeof data === "object" && data !== null) {
      return [data]; // bungkus jadi array
    } else {
      console.warn("Data kosong atau tidak valid:", data);
      return [];
    }
  } catch (error) {
    console.error("Gagal ambil data user:", error.response?.data || error.message);
    return [];
  }
};

export const updateUserRole = async (userId, newRole) => {
  try {
    const token = Cookies.get("token"); // Pastikan token tersimpan di cookies
    const response = await axios.post(
      `${API_URL}/update-user-role/${userId}`,
      { role: newRole },
      {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Gagal update role user:", error);
    throw error;
  }
};
