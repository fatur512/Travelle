import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ category }) {
  const fallbackImage = "/images/fallback.jpg";

  const imageUrl =
    typeof category.imageUrl === "string" && category.imageUrl.startsWith("http") ? category.imageUrl : fallbackImage;

  return (
    <div className="relative overflow-hidden transition-all shadow-md rounded-xl group hover:shadow-lg">
      {/* Gambar */}
      <img
        src={imageUrl}
        alt={category.name}
        className="object-cover w-full h-40"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = fallbackImage;
        }}
      />

      {/* Overlay gradient teks */}
      <div className="absolute inset-0 flex flex-col items-center justify-end p-4 text-white bg-gradient-to-t from-black/60 via-black/30 to-transparent">
        <h3 className="mb-2 text-lg font-bold">{category.name}</h3>
        <Link
          to={`/categories/${category.id}`}
          className="inline-block px-4 py-1 text-sm font-medium transition border border-white rounded hover:bg-white hover:text-black"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
