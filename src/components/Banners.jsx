import React from "react";
import useBanners from "../hooks/useBannerById"; // Sesuaikan path jika Anda belum rename file hook-nya

export default function Banners() {
  const { banners, loading, error } = useBanners();

  // Filter banners untuk hanya menampilkan yang memiliki imageUrl dan name yang valid
  const validBanners = banners.filter(
    (banner) =>
      banner.imageUrl &&
      banner.imageUrl.startsWith("http") && // Memastikan imageUrl adalah URL yang valid
      banner.name &&
      banner.name.trim() !== "" // Memastikan nama tidak hanya spasi kosong
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-xl text-gray-700">Loading banners...</div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[200px] text-xl text-red-600 font-bold">{error}</div>;
  }

  if (validBanners.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-xl text-gray-500">
        No valid banners available to display.
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <h2 className="mb-10 text-4xl font-extrabold text-center text-gray-900">Discover Amazing Destinations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {validBanners.map((banner) => (
          <div
            key={banner.id}
            className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={banner.imageUrl}
              alt={banner.name || "Banner Image"} // Fallback alt text
              className="object-cover w-full h-48 border-b border-gray-200"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Available";
              }} // Fallback for broken images
            />
            <h3 className="p-4 text-xl font-semibold text-gray-800">{banner.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
