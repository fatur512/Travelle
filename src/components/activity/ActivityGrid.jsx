// components/activities/ActivityGrid.jsx
import React from "react";
import ActivityCard from "./ActivityCard";

export default function ActivityGrid({ activities }) {
  if (!activities || activities.length === 0) {
    return <p className="text-center text-gray-500">Belum ada aktivitas tersedia.</p>;
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
