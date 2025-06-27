import { useEffect, useState } from "react";
import { fetchCategories } from "../../services/categoriesService";

export default function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories", err);
      } finally {
        setLoading(false);
      }
    };
    loadCategories();
  }, []);

  return { categories, loading, error };
}
