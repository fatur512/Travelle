import React from "react";
import useCategories from "../../hooks/categories/useCategories";
import CategoryCard from "../../components/categories/CategoryCard";

export default function CategoryListPage() {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3 md:grid-cols-4">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}
