import React from "react";
import { Link } from "react-router-dom";
import useCategories from "../../hooks/categories/useCategories";

export default function UserDashboardTopCategories() {
  const { categories, loading } = useCategories();
  const topCategories = categories?.slice(0, 4) || [];

  return (
    <div className="p-4 mt-8">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Kategori Populer</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {topCategories.map((cat) => (
            <div key={cat.id} className="p-3 text-center bg-white rounded shadow">
              <img
                src={cat.imageUrl}
                alt={cat.name}
                className="object-cover w-full h-24 mb-2 rounded"
                onError={(e) => (e.target.style.display = "none")}
              />
              <p className="text-sm font-semibold text-gray-700">{cat.name}</p>
            </div>
          ))}
        </div>
      )}

      <Link to="/categories" className="inline-block mt-4 text-blue-600 hover:underline">
        Lihat Semua Kategori →
      </Link>
    </div>
  );
}
