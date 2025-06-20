import { useEffect, useState } from "react";
import { fetchActivites } from "../../services/activitiesService";

export default function useActivities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getActivities = async () => {
    setLoading(true);
    try {
      const data = await fetchActivites();
      setActivities(data);
    } catch (error) {
      console.error("failed load activities:", error);
      setError("failed activities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivities();
  }, []);

  return { activities, loading, error };
}
