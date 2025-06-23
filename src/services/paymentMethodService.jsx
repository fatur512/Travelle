import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";

export const fetchPaymentMethods = async () => {
  const token = Cookies.get("token");

  if (!token) {
    throw new Error("User not authenticated");
  }

  const res = await axios.get(`${API_URL}/payment-methods`, {
    headers: {
      apiKey: API_KEY,
    },
  });
  return res.data.data;
};
