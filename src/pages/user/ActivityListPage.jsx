import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useActivities from "../../hooks/activities/useActivities";

export default function ActivityListPage() {
  const { activities, loading, error } = useActivities();

  const [imageError, setImageError] = useState({});

  return (
    <div className="container px-4 py-10 mx-auto">
      <h2 className="mb-8 text-2xl font-bold text-center">Semua Aktivitas</h2>

      {loading && <p className="text-center text-gray-600">Memuat aktivitas...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {activities.map((activity) => {
            const imgSrc = imageError[activity.id] ? "/images/fallback.jpg" : activity.category?.imageUrl;

            return (
              <div
                key={activity.id}
                className="flex flex-col overflow-hidden transition bg-white shadow rounded-xl hover:shadow-lg"
              >
                <img
                  src={imgSrc}
                  alt={activity.title}
                  className="w-full h-[180px] object-cover"
                  onError={() => setImageError((prev) => ({ ...prev, [activity.id]: true }))}
                />
                <div className="flex-grow p-4">
                  <h4 className="mb-1 text-lg font-bold">{activity.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{activity.description || "Tidak ada deskripsi"}</p>
                </div>
                <div className="p-4 border-t">
                  <p className="mb-3 text-base font-semibold text-blue-600">
                    Rp {activity.price.toLocaleString("id-ID")}
                  </p>
                  <Link
                    to={`/activity/${activity.id}`}
                    className="block w-full px-4 py-2 mt-4 text-center text-white bg-blue-600 rounded hover:bg-blue-700"
                  >
                    Lihat Detail
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
