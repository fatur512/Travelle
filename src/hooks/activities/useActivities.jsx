import { useEffect, useState } from "react";
import { fetchActivities } from "../../services/activitiesService";

export default function useActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadActivities = async () => {
    setLoading(true);
    setError(null); // Reset error sebelum fetch
    try {
      const data = await fetchActivities();
      setActivities(data);
    } catch (err) {
      console.error("Failed to load activities:", err);
      setError("Gagal memuat data aktivitas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  return {
    activities,
    loading,
    error,
    reloadActivities: loadActivities, // bisa digunakan di komponen untuk refresh manual
  };
}
