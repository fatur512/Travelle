import React, { useEffect, useState } from "react";
import { fetchActivities, createActivity, updateActivity, deleteActivity } from "../../services/activitiesService";

export default function ActivityAdminPage() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    price: "",
    rating: "",
    totalReviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadActivities = async () => {
    setLoading(true);
    try {
      const data = await fetchActivities();
      setActivities(data);
    } catch (err) {
      console.error("Gagal mengambil aktivitas:", err);
      alert("Gagal mengambil daftar aktivitas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, []);

  const openCreateModal = () => {
    setForm({
      name: "",
      imageUrl: "",
      price: "",
      rating: "",
      totalReviews: "",
      facilities: "",
      address: "",
      province: "",
      city: "",
      location: "",
      description: "",
    });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (activity) => {
    setForm({
      name: activity.name,
      imageUrl: activity.imageUrl,
      price: activity.price,
      rating: activity.rating,
      totalReviews: activity.totalReviews,
      facilities: activity.facilities,
      address: activity.address,
      province: activity.province,
      city: activity.city,
      location: activity.location,
      description: activity.description,
    });
    setEditingId(activity.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({
      name: "",
      imageUrl: "",
      price: "",
      rating: "",
      totalReviews: "",
      facilities: "",
      address: "",
      province: "",
      city: "",
      location: "",
      description: "",
    });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      totalReviews: Number(form.totalReviews),
    };

    try {
      if (editingId) {
        await updateActivity(editingId, payload);
      } else {
        await createActivity(payload);
      }
      closeModal();
      await loadActivities();
    } catch (err) {
      console.error("Gagal menyimpan aktivitas:", err.response?.data || err.message);
      alert(`Gagal menyimpan aktivitas: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus aktivitas ini?")) {
      try {
        await deleteActivity(id);
        await loadActivities();
        alert("Aktivitas berhasil dihapus.");
      } catch (err) {
        console.error("Gagal menghapus aktivitas:", err.response?.data || err.message);
        alert(`Gagal menghapus aktivitas: ${err.response?.data?.message || err.message}`);
      }
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between mb-8 sm:flex-row sm:mb-12">
          <h1 className="text-3xl font-semibold text-black sm:text-4xl">🗽️ Admin Activity Management</h1>
          <button
            onClick={openCreateModal}
            className="w-full px-6 py-3 mt-6 text-black transition-all duration-200 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-white sm:mt-0 sm:w-auto sm:focus:ring-offset-2"
          >
            + Tambah Aktivitas
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-400 sm:text-xl">Memuat aktivitas...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-400 sm:text-xl">Belum ada aktivitas tersedia.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <div key={activity.id} className="p-4 transition duration-200 border rounded-lg shadow hover:shadow-md">
                <img
                  src={activity.imageUrl || "/fallback-image.jpg"}
                  onError={(e) => (e.currentTarget.src = "/fallback-image.jpg")}
                  alt={activity.name}
                  className="object-cover w-full h-40 mb-4 rounded-md"
                />
                <h3 className="mb-1 text-xl font-semibold">{activity.name}</h3>
                <p className="mb-1 text-sm text-gray-600">Rp{activity.price?.toLocaleString("id-ID")}</p>
                <p className="mb-2 text-sm text-gray-600">
                  Rating: {activity.rating} ({activity.totalReviews})
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(activity)}
                    className="px-3 py-1 text-sm text-white bg-gray-500 rounded hover:bg-gray-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(activity.id)}
                    className="px-3 py-1 text-sm text-white rounded bg-indigo-950 hover:bg-indigo-800"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
            <div className="w-full max-w-2xl p-6 mx-4 bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh]">
              <h2 className="mb-4 text-2xl font-semibold">{editingId ? "Edit Aktivitas" : "Tambah Aktivitas"}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Nama Aktivitas"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="url"
                  placeholder="URL Gambar"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Harga"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="Rating"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="number"
                  placeholder="Total Ulasan"
                  value={form.totalReviews}
                  onChange={(e) => setForm({ ...form, totalReviews: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Fasilitas"
                  value={form.facilities}
                  onChange={(e) => setForm({ ...form, facilities: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  placeholder="Alamat"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Provinsi"
                  value={form.province}
                  onChange={(e) => setForm({ ...form, province: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Kota"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <input
                  type="text"
                  placeholder="Lokasi"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <textarea
                  placeholder="Deskripsi"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 border rounded"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-300 rounded">
                    Batal
                  </button>
                  <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded">
                    {editingId ? "Perbarui" : "Tambah"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
