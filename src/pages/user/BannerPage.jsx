import React from "react";
import useBanner from "../../hooks/banner/useBanner";

export default function BannerPage() {
  const { banners, loading, error } = useBanner();

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-100">
      <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">Semua Banner</h2>

      {loading && <p className="text-center text-gray-600 animate-pulse">Memuat banner...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && banners.length === 0 && (
        <p className="text-center text-gray-500">Belum ada banner ditampilkan.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {banners.map((banner) => (
          <div key={banner.id} className="overflow-hidden transition bg-white rounded-lg shadow-md hover:shadow-lg">
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="object-cover w-full h-40"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/images/fallback.jpg"; // letakkan fallback.jpg di /public/images/
              }}
            />
            <div className="p-4">
              <h4 className="text-base font-semibold text-gray-800">{banner.name}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
