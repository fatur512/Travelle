import React, { useState } from "react";
import useBanner from "../../hooks/banner/useBanner";
import usePromo from "../../hooks/promo/usePromo";
import useActivities from "../../hooks/activities/useActivities";
import UserDashboardTopCategories from "./userDashboardCategories";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { banners, loading: bannerLoading } = useBanner();
  const { promos, loading: promoLoading } = usePromo();
  const { activities, loading, error } = useActivities();

  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const paginatedActivities = activities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen pb-10 bg-gray-50">
      <main className="px-4 pt-8 mx-auto max-w-7xl">
        <h2 className="mb-8 text-3xl font-extrabold text-center text-blue-800">Welcome to Your Adventure!</h2>

        {/* 🏷️ Categories */}
        <UserDashboardTopCategories />

        {/* 🎯 Banner Section */}
        {!bannerLoading && banners.length > 0 && (
          <section className="mt-10">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {banners.map((banner) => (
                <div key={banner.id} className="overflow-hidden transition bg-white shadow rounded-xl hover:shadow-lg">
                  <img
                    src={banner.imageUrl}
                    alt={banner.name}
                    className="object-cover w-full h-[180px]"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{banner.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 🎉 Promo Section */}
        {!promoLoading && promos.length > 0 && (
          <section className="mt-12">
            <h3 className="mb-4 text-xl font-semibold text-gray-700">Promo Terbaru</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              {promos.map((promo) => (
                <div key={promo.id} className="overflow-hidden transition bg-white shadow rounded-xl hover:shadow-lg">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="object-cover w-full h-[150px]"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="p-4">
                    <h4 className="text-base font-semibold text-gray-800">{promo.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{promo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 🧭 Activities Section */}
        <section className="mt-14">
          <h3 className="mb-4 text-xl font-bold text-gray-800">Semua Aktivitas</h3>

          {loading && <p className="text-gray-500">Memuat aktivitas...</p>}
          {error && <p className="text-red-600">{error}</p>}

          {!loading && !error && (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col overflow-hidden transition bg-white shadow rounded-xl hover:shadow-lg"
                  >
                    <img
                      src={activity.category?.imageUrl}
                      alt={activity.title}
                      className="w-full h-[180px] object-cover"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <div className="flex-grow p-4">
                      <h4 className="mb-1 text-lg font-bold text-gray-800">{activity.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{activity.description}</p>
                    </div>
                    <div className="p-4 border-t">
                      <p className="mb-3 text-base font-semibold text-blue-600">
                        Rp {activity.price.toLocaleString("id-ID")}
                      </p>
                      <Link
                        to={`/activity/${activity.id}`}
                        className="block w-full px-4 py-2 mt-2 text-sm text-center text-white bg-blue-600 rounded hover:bg-blue-700"
                      >
                        Lihat Detail
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {/* 🔁 Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4 mt-6">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-sm text-white bg-gray-600 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-sm font-medium text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-sm text-white bg-gray-600 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <footer className="py-6 mt-16 text-white bg-gray-800">
        <div className="px-4 mx-auto text-center max-w-7xl">
          <p>&copy; {new Date().getFullYear()} Travel Journal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
