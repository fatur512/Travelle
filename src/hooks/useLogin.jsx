import axios from "axios";
import { useState } from "react";
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
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        { email, password },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      const { token, data } = res.data;

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("isLoggedIn", "true", { expires: 7 });

      if (data) {
        setUser(data);
        Cookies.set("user", JSON.stringify(data), { expires: 7 });
      }

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
      console.error("Login error:", err);
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
