import React from "react";
import useBanner from "../../hooks/banner/useBanner";
import usePromo from "../../hooks/promo/usePromo";

export default function UserPage() {
  const { banners, loading: bannerLoading, error: bannerError } = useBanner();
  const { promos, loading: promoLoading, error: promoError } = usePromo();

  return (
    <div className="min-h-screen pb-10 bg-gray-100">
      <main className="pt-8">
        <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-900">Welcome to Your Adventure!</h2>

        {/* 🚩 Banner Section */}
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

        {/* CTA Section */}
        <section className="container px-4 mx-auto mt-12 text-center">
          <p className="text-lg text-gray-700">
            Discover amazing places and share your travel experiences with the world.
          </p>
          <button className="px-6 py-3 mt-6 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            Start Exploring
          </button>
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
