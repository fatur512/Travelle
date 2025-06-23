import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchActivityById } from "../../services/activitiesService";
import Cookies from "js-cookie";
import { addCartToBackend } from "../../services/cartService";
import { useCart } from "../../context/CartContext";

function isValidHttpUrl(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch (_) {
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
  const [imageError, setImageError] = useState(false); // ✅ untuk handle error satu kali

  useEffect(() => {
    const loadActivity = async () => {
      try {
        const data = await fetchActivityById(id);
        setActivity(data);
      } catch (err) {
        console.error("Failed to fetch activity:", err);
        setError("Aktivitas tidak ditemukan.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadActivity();
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

  // ✅ Gunakan fallback hanya sekali jika error
  const imageUrl =
    !imageError && isValidHttpUrl(activity?.imageUrls?.[0])
      ? activity.imageUrls[0]
      : isValidHttpUrl(activity?.category?.imageUrl)
      ? activity.category.imageUrl
      : "/images/fallback.jpg";

  return (
    <div className="max-w-3xl px-4 py-8 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{activity.title}</h1>

      <img
        src={imageUrl}
        alt={activity.title}
        className="object-cover w-full h-64 mb-4 rounded"
        onError={() => setImageError(true)}
      />

      <p className="text-gray-700">{activity.description || "Tidak ada deskripsi."}</p>
      <p className="mt-4 text-xl font-bold text-blue-600">Rp {activity.price.toLocaleString("id-ID")}</p>

      <button
        onClick={handleAddToCart}
        disabled={adding}
        className="w-full px-4 py-3 mt-6 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {adding ? "Menambahkan..." : "Tambah ke Keranjang"}
      </button>
    </div>
  );
}
