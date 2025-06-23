// src/hooks/banner/useBanner.js
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, API_KEY } from "../../config/env";

export default function useBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/banners`, {
        headers: { apiKey: API_KEY },
      })
      .then((res) => {
        setBanners(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Gagal memuat banner");
        setLoading(false);
      });
  }, []);

  return { banners, loading, error };
}
