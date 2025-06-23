import React from "react";
import usePromo from "../../hooks/promo/usePromo";

export default function PromoPage() {
  const { promos, loading, error } = usePromo();

  return (
    <section className="container px-4 mx-auto mt-8">
      <h3 className="mb-4 text-xl font-semibold text-gray-700">Promotions</h3>

      {loading && <p className="text-gray-500">Loading promotions...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && (
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
  );
}
