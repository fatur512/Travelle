import React, { useState } from "react";
import useBanners from "../hooks/banner/useBanner"; // Pastikan path benar
import useCreateBanner from "../hooks/banner/useCreateBanner";
import NavbarUser from "./NavbarUser";

export default function Banners() {
  // Dapatkan getBanners supaya bisa refresh data setelah create
  const { banners, loading, error, getBanners } = useBanners();

  // Hook untuk create banner dengan callback refresh data
  const { handleCreate } = useCreateBanner(() => getBanners());

  // State form sederhana untuk contoh create banner
  const [newBanner, setNewBanner] = useState({ name: "", image: null });
  const [createError, setCreateError] = useState(null);

  // Filter banners valid
  const validBanners = banners.filter(
    (banner) => banner.imageUrl && banner.imageUrl.startsWith("http") && banner.name && banner.name.trim() !== ""
  );

  // Handle submit create banner
  const onSubmit = async (e) => {
    e.preventDefault();
    setCreateError(null);

    // Validasi sederhana
    if (!newBanner.name || !newBanner.image) {
      setCreateError("Please fill in both name and image URL");
      return;
    }

    const formData = new FormData();
    formData.append("name", newBanner.name);
    formData.append("image", newBanner.image);

    try {
      await handleCreate(formData); // Panggil create banner
      setNewBanner({ name: "", imageUrl: "" }); // Reset form
    } catch (error) {
      setCreateError("Failed to create banner", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-xl text-gray-700">Loading banners...</div>
    );
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-[200px] text-xl text-red-600 font-bold">{error}</div>;
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <NavbarUser />
      <h2 className="mb-10 text-4xl font-extrabold text-center text-gray-900">Discover Amazing Destinations</h2>

      {/* Form Create Banner */}
      <form onSubmit={onSubmit} className="max-w-md mx-auto mb-8 space-y-4">
        <input
          type="text"
          placeholder="Banner Name"
          value={newBanner.name}
          onChange={(e) => setNewBanner({ ...newBanner, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          accept="image/"
          placeholder="Image URL"
          onChange={(e) => setNewBanner({ ...newBanner, image: e.target.files[0] })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        {createError && <p className="text-red-600">{createError}</p>}
        <button type="submit" className="px-4 py-2 font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
          Create Banner
        </button>
      </form>

      {/* Banner List */}
      {validBanners.length === 0 ? (
        <div className="flex items-center justify-center min-h-[200px] text-xl text-gray-500">
          No valid banners available to display.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {validBanners.slice(0, 3).map((banner) => (
            <div
              key={banner.id}
              className="overflow-hidden transition duration-300 transform bg-white rounded-lg shadow-xl hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={banner.imageUrl}
                alt={banner.name || "Banner Image"}
                className="object-cover w-full border-b border-gray-200 h-30"
                onError={(e) => {
                  e.target.onerror = null;
                }}
              />
              <h3 className="p-4 text-xl font-semibold text-gray-800">{banner.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
