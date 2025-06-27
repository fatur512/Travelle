import axios from "axios";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";

// ✅ LOGIN
export const loginService = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        headers: {
          apiKey: API_KEY,
        },
      }
    );

    const { token, data } = response.data;

    if (token) {
      Cookies.set("token", token, { expires: 7 });
      Cookies.set("isLoggedIn", "true", { expires: 7 });
    }

    if (data) {
      Cookies.set("user", JSON.stringify(data), { expires: 7 });
    }

    return { token, data };
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Login gagal. Silakan periksa kembali.";
    throw new Error(errorMessage);
  }
};

// ✅ LOGOUT
export const logoutService = async () => {
  try {
    const res = await axios.get(`${API_URL}/logout`, {
      headers: {
        apiKey: API_KEY,
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });

    // Hapus cookies
    Cookies.remove("token");
    Cookies.remove("isLoggedIn");
    Cookies.remove("user");

    return res.data;
  } catch (error) {
    console.error("Logout error:", error.response?.data || error.message);
    throw new Error("Gagal logout.");
  }
};
