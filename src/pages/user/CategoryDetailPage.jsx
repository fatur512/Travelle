import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCategoryById } from "../../services/categoriesService";
import { fetchActivities } from "../../services/activitiesService";

export default function CategoryDetailPage() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoryData = await fetchCategoryById(id);
        const allActivities = await fetchActivities();
        const filteredActivities = allActivities.filter((act) => act.categoryId === id);

        setCategory(categoryData);
        setActivities(filteredActivities);
      } catch (err) {
        console.error("Error loading category or activities:", err);
        setError("Gagal memuat kategori atau aktivitas.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadData();
    } else {
      setLoading(false);
      setError("Kategori tidak ditemukan.");
    }
  }, [id]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (error) return <p className="p-4 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto bg-white shadow-lg rounded-xl">
      <h1 className="mb-6 text-3xl font-extrabold text-center text-blue-700">{category.name}</h1>

      <img
        src={category.imageUrl}
        alt={category.name}
        className="object-cover w-full mb-8 rounded-xl h-72"
        onError={(e) => (e.target.style.display = "none")}
      />

      <p className="mb-10 text-sm text-center text-gray-500">Kategori ID: {category.id}</p>

      <h2 className="mb-4 text-2xl font-bold text-gray-800">Activities Tersedia:</h2>

      {activities.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((act) => (
            <div
              key={act.id}
              className="flex flex-col overflow-hidden transition border shadow rounded-xl hover:shadow-lg bg-gray-50"
            >
              <img
                src={act.imageUrls?.[0] || act.category?.imageUrl}
                alt={act.title}
                className="object-cover w-full h-48"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="flex-grow p-4">
                <h3 className="mb-1 text-lg font-bold text-gray-900">{act.title}</h3>
                <p className="mb-2 text-sm text-gray-600 line-clamp-2">{act.description}</p>

                <div className="text-sm text-gray-500">
                  <p>
                    <strong>Harga:</strong> Rp {act.price.toLocaleString("id-ID")}
                  </p>
                  {act.rating && (
                    <p>
                      <strong>Rating:</strong> {act.rating} ⭐
                    </p>
                  )}
                  {act.city && (
                    <p>
                      <strong>Lokasi:</strong> {act.city}
                    </p>
                  )}
                </div>
              </div>
              <div className="p-4 border-t">
                <a
                  href={`/activity/${act.id}`}
                  className="block w-full px-4 py-2 text-center text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Lihat Detail
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">Tidak ada aktivitas dalam kategori ini.</p>
      )}
    </div>
  );
}
