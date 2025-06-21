import { useEffect, useState } from "react";
import { fetchBanners } from "../../services/bannerService";

export default function useBanner() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getBanners = async () => {
    setLoading(true);
    try {
      const data = await fetchBanners();
      setBanners(data);
    } catch (err) {
      console.error("Failed to load banners:", err);
      setError("Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBanners();
  }, []);

  return { banners, loading, error, getBanners };
}
