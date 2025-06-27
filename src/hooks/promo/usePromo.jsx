import React, { useEffect, useState } from "react";
import { fetchPromos } from "../../services/promoService";

export default function usePromo() {
  const [promos, setPromos] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getPromos = async () => {
    setLoading(true);

    try {
      const data = await fetchPromos();
      setPromos(data);
    } catch (error) {
      console.error("Failed load promos:", error);
      setError("Failed load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPromos();
  }, []);

  return { promos, loading, error, getPromos };
}
