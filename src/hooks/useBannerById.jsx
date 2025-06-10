import axios from "axios";
import React, { useEffect, useState } from "react";

export default function useBannerById() {
  const API_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners";

  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBanners = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(API_URL, {
        headers: {
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
        },
      });
      console.log(res.data.data);
      setBanners(res.data.data);
    } catch (error) {
      console.log("Failed fetch banners", error);
      setError("failed load banners, try again");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  return {
    banners,
    loading,
    error,
    getBanners,
  };
}
