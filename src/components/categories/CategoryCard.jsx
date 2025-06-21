import React from "react";

export default function CategoryCard({ category }) {
  return (
    <div className="p-4 text-center bg-white rounded shadow">
      <img
        src={category.imageUrl}
        alt={category.name}
        className="object-cover w-full h-32 mb-2 rounded"
        onError={(e) => (e.target.style.display = "none")}
      />
      <h3 className="text-lg font-semibold">{category.name}</h3>
    </div>
  );
}
