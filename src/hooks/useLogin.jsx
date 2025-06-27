import { useState } from "react";
import { loginService } from "../services/LoginService"; // Adjust path to where loginService is defined
import Cookies from "js-cookie";

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
      const { token, data } = await loginService(email, password);

      // Set additional cookies specific to the hook's needs
      Cookies.set("role", data.role, { expires: 7 });
      Cookies.set("userId", data.id, { expires: 7 });

      console.log("✅ Login berhasil sebagai:", data.email);
      console.log("🔐 Token:", token);

      setUser(data);
      setSuccess("Login berhasil!");
      return { token, data };
    } catch (err) {
      let errorMessage = "Gagal login. Cek email & password.";
      if (err.response) {
        if (err.response.status === 401) {
          errorMessage = "Email atau kata sandi salah.";
        } else if (err.response.status === 404) {
          errorMessage = "API login tidak ditemukan. Periksa URL API.";
        } else if (err.response.data?.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.request) {
        errorMessage = "Tidak ada respons dari server. Periksa koneksi.";
      }

      setError(errorMessage);
      console.error("❌ Login error:", err);
      console.error("Request URL:", err.config?.url || "Unknown URL");
      console.error("Response:", err.response?.data);
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
