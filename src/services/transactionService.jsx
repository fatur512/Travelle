import axios from "axios";
import Cookies from "js-cookie";
import { API_KEY, API_URL } from "../config/env";

export const fetchTransactions = async () => {
  const token = Cookies.get("token");

  try {
    const res = await axios.get(`${API_URL}/my-transactions`, {
      headers: {
        Authorization: `Bearer ${token}`,
        apiKey: API_KEY,
      },
    });
    return res.data.data; // hasil transaksi
  } catch (error) {
    console.error("Gagal mengambil data transaksi:", error);
    throw error;
  }
};
