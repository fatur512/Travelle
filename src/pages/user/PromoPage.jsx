import React from "react";
import usePromo from "../../hooks/promo/usePromo";

export default function PromoPage() {
  const { promos, loading, error } = usePromo();

  return (
    <section className="container px-4 mx-auto mt-8">
      <h3 className="mb-6 text-2xl font-bold text-blue-700">🎁 Promo Terbaik Untukmu</h3>

      {loading && <p className="text-gray-500">Loading promotions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && promos.length === 0 && <p className="text-gray-500">Belum ada promo tersedia saat ini.</p>}

      {!loading && !error && promos.length > 0 && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {promos.map((promo) => (
            <div
              key={promo.id}
              className="overflow-hidden transition-shadow duration-300 bg-white shadow-md rounded-2xl hover:shadow-xl group"
            >
              <div className="relative w-full h-40 overflow-hidden">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => (e.target.style.display = "none")}
                />
              </div>
              <div className="p-4">
                <h4 className="text-lg font-semibold text-gray-800">{promo.title}</h4>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">{promo.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
