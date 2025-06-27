import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";

// 🔹 Helper untuk ambil token
const getAuthHeaders = () => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("Kamu belum login.");
  }

  return {
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

// 🔸 Ambil semua transaksi user
export const fetchTransactions = async () => {
  try {
    const res = await axios.get(`${API_URL}/my-transactions`, {
      headers: getAuthHeaders(),
    });

    const data = res?.data?.data;
    if (!Array.isArray(data)) {
      console.error("❌ Format data transaksi tidak sesuai:", res.data);
      throw new Error("Format data transaksi tidak valid.");
    }

    return data;
  } catch (error) {
    const message = error.response?.data?.message || "Gagal memuat transaksi.";
    console.error("❌ Error ambil transaksi:", message);
    throw new Error(message);
  }
};

// 🔸 Buat transaksi baru
export const createTransaction = async ({ cartIds, paymentMethodId }) => {
  try {
    const res = await axios.post(
      `${API_URL}/create-transaction`,
      { cartIds, paymentMethodId },
      { headers: getAuthHeaders() }
    );

    return res.data;
  } catch (err) {
    const message = err.response?.data?.message || "Gagal membuat transaksi.";
    console.error("❌ Error buat transaksi:", message);
    throw new Error(message);
  }
};

// 🔸 Kirim bukti pembayaran (update proof URL)
export const updateTransactionProof = async (transactionId, proofPaymentUrl) => {
  const payload = {
    proofPaymentUrl, // ⬅️ Coba ubah ke "proofPaymentURL" jika ini tetap gagal
  };

  console.log("📤 Kirim payload ke server:", payload);

  try {
    const res = await axios.post(`${API_URL}/update-transaction-proof-payment/${transactionId}`, payload, {
      headers: getAuthHeaders(),
    });

    return res.data;
  } catch (err) {
    const serverError = err.response?.data;
    console.error("❌ Error update bukti pembayaran:", serverError);
    throw new Error(serverError?.message || "Gagal mengupdate bukti pembayaran.");
  }
};
