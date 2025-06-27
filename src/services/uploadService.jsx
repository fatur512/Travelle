import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";

// Fungsi untuk uppload image transaction
export const uploadTransactionImage = async (file) => {
  const token = Cookies.get("token");

  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(`${API_URL}/upload-image`, formData, {
    headers: {
      apiKey: API_KEY,
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.url;
};
