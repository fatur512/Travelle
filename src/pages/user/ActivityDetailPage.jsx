import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchActivityById, fetchActivities } from "../../services/activitiesService";
import Cookies from "js-cookie";
import { addCartToBackend } from "../../services/cartService";
import { useCart } from "../../context/CartContext";

function isValidHttpUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (err) {
    console.error("Invalid URL:", url, err);
    return false;
  }
}

export default function ActivityDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState("");
  const [imageError, setImageError] = useState(false);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const loadActivityAndRecommended = async () => {
      try {
        const data = await fetchActivityById(id);
        setActivity(data);

        if (data?.category?.id) {
          const allActivities = await fetchActivities();
          const filtered = allActivities.filter((a) => a.id !== data.id && a.category?.id === data.category.id);
          setRecommended(filtered.slice(0, 4));
        }
      } catch (err) {
        console.error("Failed to fetch activity:", err);
        setError("Aktivitas tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadActivityAndRecommended();
    } else {
      setError("ID tidak valid.");
      setLoading(false);
    }
  }, [id]);

  const handleAddToCart = async () => {
    const token = Cookies.get("token");
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      return navigate("/login");
    }

    if (!activity) return;

    setAdding(true);
    try {
      await addCartToBackend({ activityId: activity.id, quantity: 1 });
      addToCart({ id: activity.id, activity, quantity: 1 });
      alert("Berhasil ditambahkan ke keranjang.");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Gagal menambahkan ke keranjang.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <p className="mt-10 text-center">Loading...</p>;
  if (error) return <p className="mt-10 text-center text-red-500">{error}</p>;

  const imageUrl =
    !imageError && isValidHttpUrl(activity?.imageUrls?.[0])
      ? activity.imageUrls[0]
      : isValidHttpUrl(activity?.category?.imageUrl)
      ? activity.category.imageUrl
      : "/images/fallback.jpg";

  return (
    <div className="px-4 py-8">
      {/* Detail Card */}
      <div className="max-w-2xl p-6 mx-auto transition-all bg-white shadow-xl rounded-2xl">
        <h1 className="mb-4 text-3xl font-semibold text-gray-800">{activity.title}</h1>

        <div className="w-full mb-6 overflow-hidden bg-gray-100 rounded-xl aspect-video">
          <img
            src={imageUrl}
            alt={activity.title}
            onError={() => setImageError(true)}
            className="object-cover w-full h-full"
          />
        </div>

        <p className="leading-relaxed text-gray-600">{activity.description || "Tidak ada deskripsi."}</p>
        <p className="mt-6 text-2xl font-bold text-blue-700">Rp {activity.price.toLocaleString("id-ID")}</p>

        <button
          onClick={handleAddToCart}
          disabled={adding}
          className="w-full px-6 py-3 mt-6 text-white transition duration-200 bg-blue-600 rounded-xl hover:bg-blue-700 disabled:opacity-50"
        >
          {adding ? "Menambahkan..." : "Tambah ke Keranjang"}
        </button>
      </div>

      {/* Recommended Section */}
      {recommended.length > 0 && (
        <div className="max-w-6xl mx-auto mt-16">
          <h2 className="mb-6 text-2xl font-semibold text-gray-800">Rekomendasi Lainnya</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {recommended.map((item) => {
              const img = isValidHttpUrl(item.imageUrls?.[0])
                ? item.imageUrls[0]
                : isValidHttpUrl(item.category?.imageUrl)
                ? item.category.imageUrl
                : "/images/fallback.jpg";

              return (
                <div
                  key={item.id}
                  onClick={() => navigate(`/activity/${item.id}`)}
                  className="overflow-hidden transition bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg"
                >
                  <div className="bg-gray-100 aspect-video">
                    <img src={img} alt={item.title} className="object-cover w-full h-full" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-800">{item.title}</h3>
                    <p className="mt-1 text-sm font-bold text-blue-600">Rp {item.price.toLocaleString("id-ID")}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
