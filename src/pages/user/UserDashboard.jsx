import React, { useState } from "react";
import useBanner from "../../hooks/banner/useBanner";
import usePromo from "../../hooks/promo/usePromo";
import useActivities from "../../hooks/activities/useActivities";
import UserDashboardTopCategories from "./userDashboardCategories";
import { Link } from "react-router-dom";

export default function UserDashboard() {
  const { banners, loading: bannerLoading, error: bannerError } = useBanner();
  const { promos, loading: promoLoading, error: promoError } = usePromo();
  const { activities, loading, error } = useActivities();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 6;

  // Calculate total pages and slice activities for current page
  const totalPages = Math.ceil(activities.length / ITEMS_PER_PAGE);
  const paginatedActivities = activities.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen pb-10 bg-gray-100">
      <main className="pt-8">
        <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-900">Welcome to Your Adventure!</h2>

        {/* 🏷️ Categories Section */}
        <UserDashboardTopCategories />

        {/* 🎯 Banner Section */}
        <section className="container px-4 mx-auto">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Featured Banners</h3>

          {bannerLoading && <p className="text-gray-500">Loading banners...</p>}
          {bannerError && <p className="text-red-600">{bannerError}</p>}

          {!bannerLoading && !bannerError && (
            <div className="flex gap-4 pb-4 overflow-x-auto">
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="min-w-[250px] max-w-[250px] flex-shrink-0 bg-white rounded-lg shadow-md"
                >
                  <img
                    src={banner.imageUrl}
                    alt={banner.name}
                    className="object-cover w-full h-40 rounded-t-lg"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="p-4">
                    <h4 className="text-lg font-bold">{banner.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🎉 Promo Section */}
        <section className="container px-4 mx-auto mt-8">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Promotions</h3>

          {promoLoading && <p className="text-gray-500">Loading promotions...</p>}
          {promoError && <p className="text-red-600">{promoError}</p>}

          {!promoLoading && !promoError && (
            <div className="flex gap-4 pb-4 overflow-x-auto">
              {promos.map((promo) => (
                <div
                  key={promo.id}
                  className="min-w-[250px] max-w-[250px] h-[300px] flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-[160px] object-cover rounded-t-lg"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div className="p-4">
                    <h4 className="text-base font-bold">{promo.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{promo.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 🧭 Activities Section */}
        <section className="container px-4 mx-auto mt-10">
          <h3 className="mb-4 text-xl font-semibold text-gray-700">Activities</h3>

          {loading && <p className="text-gray-500">Loading activities...</p>}
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
                      <h4 className="mb-1 text-lg font-bold">{activity.title}</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{activity.description}</p>
                    </div>
                    <div className="p-4 border-t">
                      <p className="mb-3 text-base font-semibold text-blue-600">{activity.price}</p>
                      <Link
                        to={`/activity/${activity.id}`}
                        className="block w-full px-4 py-2 mt-4 text-center text-white bg-blue-600 rounded hover:bg-blue-700"
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

      <footer className="py-6 mt-10 text-white bg-gray-800">
        <div className="container px-4 mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Travel Journal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
