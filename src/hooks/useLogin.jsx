// src/hooks/useLogin.js
import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { API_URL, API_KEY } from "../config/env";

export default function useLogin() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const getLogin = async (email, password) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${API_URL}/login`,
        { email, password },
        {
          headers: {
            apiKey: API_KEY,
          },
        }
      );

      const { token, data } = res.data;

      if (!token || !data) throw new Error("Login gagal. Token tidak valid.");

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("isLoggedIn", "true", { expires: 7 });
      Cookies.set("user", JSON.stringify(data), { expires: 7 });
      Cookies.set("role", data.role, { expires: 7 });
      Cookies.set("userId", data.id, { expires: 7 });

      console.log("✅ Login berhasil sebagai:", data.email);
      console.log("🔐 Token:", token);

      setUser(data);
      setSuccess("Login berhasil!");
      return res.data;
    } catch (err) {
      let errorMessage = "Gagal login. Cek email & password.";
      if (err.response?.status === 401) {
        errorMessage = "Email atau kata sandi salah.";
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
      console.error("❌ Login error:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    error,
    success,
    loading,
    user,
    getLogin,
  };
}
