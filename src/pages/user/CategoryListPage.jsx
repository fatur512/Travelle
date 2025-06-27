import React, { useState } from "react";
import useCategories from "../../hooks/categories/useCategories";
import CategoryCard from "../../components/categories/CategoryCard";

export default function CategoryListPage() {
  const { categories, loading, error } = useCategories();
  const [visibleCount, setVisibleCount] = useState(9);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 9); // tampilkan tambahan 9 per klik
  };

  if (loading) return <p className="mt-10 text-center">Memuat kategori...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl px-4 py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold text-center">Semua Kategori</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {categories.slice(0, visibleCount).map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>

      {visibleCount < categories.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
