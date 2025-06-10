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

    const payload = { email, password };

    try {
      const res = await axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login", payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });

      Cookies.set("token", res.data.token, { expires: 7 });
      Cookies.set("isLoggedIn", "true", { expires: 7 });

      if (res.data.data) {
        setUser(res.data.data);
        Cookies.set("user", JSON.stringify(res.data.data), { expires: 7 });
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
      console.error("Error during login:", err);
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
