import React, { useEffect, useState } from "react";
import { fetchActivites } from "../../services/activitiesService";
import { Link } from "react-router-dom";

export default function ActivityDetailPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const data = await fetchActivites();
        setActivities(data);
      } catch (err) {
        console.error("Failed to fetch activities:", err);
        setError("Gagal memuat aktivitas.");
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  if (loading) return <p className="mt-10 text-center">Loading activities...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Semua Aktivitas</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {activities.map((activity) => (
          <div key={activity.id} className="overflow-hidden bg-white rounded-lg shadow hover:shadow-lg">
            <img
              src={activity.imageUrls?.[0] || activity.category?.imageUrl}
              alt={activity.title}
              className="object-cover w-full h-40"
              onError={(e) => (e.target.style.display = "none")}
            />
            <div className="p-4">
              <h3 className="mb-1 text-lg font-semibold">{activity.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
              <p className="mt-2 font-bold text-blue-600">Rp {activity.price.toLocaleString("id-ID")}</p>
              <Link
                to={`/activity/${activity.id}`}
                className="inline-block px-4 py-2 mt-3 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Lihat Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
