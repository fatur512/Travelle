import React from "react";
import { Link } from "react-router-dom";

export default function ActivityCard({ activity }) {
  if (!activity) return null;

  const isValidImage = (url) => typeof url === "string" && url.startsWith("http");

  const imageUrl = isValidImage(activity.imageUrls?.[0])
    ? activity.imageUrls[0]
    : isValidImage(activity.category?.imageUrl)
    ? activity.category.imageUrl
    : "/images/fallback.jpg"; // pastikan kamu punya fallback image ini di /public/images

  return (
    <div className="flex flex-col overflow-hidden transition-transform bg-white rounded-xl shadow hover:shadow-md hover:scale-[1.02]">
      <img
        src={imageUrl}
        alt={activity.title}
        className="object-cover w-full h-40"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "/images/fallback.jpg";
        }}
      />
      <div className="flex flex-col flex-grow p-4">
        <h3 className="mb-1 text-lg font-semibold text-gray-900">{activity.title}</h3>
        <p className="flex-grow text-sm text-gray-600 line-clamp-2">{activity.description}</p>
        <p className="mt-2 font-bold text-blue-600">Rp {activity.price.toLocaleString("id-ID")}</p>
        <Link
          to={`/activity/${activity.id}`}
          className="inline-block px-4 py-2 mt-3 text-sm text-center text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}
