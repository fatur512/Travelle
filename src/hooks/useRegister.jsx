import axios from "axios";
import { useState } from "react";

export default function useRegister() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const getRegister = async ({ name, email, password, passwordRepeat, role, profilePicture, phoneNumber }) => {
    setLoading(true);
    setError("");
    setSuccess("");

    const payload = {
      name,
      email,
      password,
      passwordRepeat,
      role,
      profilePicture,
      phoneNumber,
    };

    try {
      const res = await axios.post("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register", payload, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });

      setSuccess("Registrasi berhasil. Silakan login.");
      return res.data;
    } catch (err) {
      console.error("Gagal register:", err.response?.data);
      console.error("Detail errors:", err.response?.data?.errors);
      setError(err.response?.data?.message || "Gagal melakukan registrasi.");
      setLoading(false);
    }
  };

  return {
    getRegister,
    error,
    success,
    loading,
  };
}
