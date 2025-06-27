import React, { useEffect, useState } from "react";
import { fetchBanners, createBanner, updateBanner, deleteBanner } from "../../services/bannerService";

export default function AdminBannerPage() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const loadBanners = async () => {
    setLoading(true);
    try {
      const data = await fetchBanners();
      setBanners(data);
    } catch (err) {
      console.error("Gagal ambil banner:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  const openCreateModal = () => {
    setForm({ name: "", imageUrl: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const openEditModal = (banner) => {
    setForm({ name: banner.name, imageUrl: banner.imageUrl });
    setEditingId(banner.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", imageUrl: "" });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: form.name, imageUrl: form.imageUrl };

    try {
      if (editingId) {
        await updateBanner(editingId, payload);
      } else {
        await createBanner(payload);
      }

      closeModal();
      await loadBanners();
    } catch (err) {
      console.error("Gagal simpan banner:", err.response?.data || err.message);
      alert("Gagal simpan banner.");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus banner ini?")) {
      try {
        await deleteBanner(id);
        await loadBanners();
      } catch (err) {
        console.error("Gagal hapus banner:", err.response?.data || err.message);
        alert("Gagal hapus banner.");
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="flex items-center justify-between mb-8">
        <h1 className="flex items-center text-4xl font-bold text-blue-800">🎨 Admin Banner Management</h1>
        <button
          onClick={openCreateModal}
          className="px-6 py-3 text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700"
        >
          + Tambah Banner
        </button>
      </div>

      {loading ? (
        <p className="text-lg text-gray-600">Loading...</p>
      ) : banners.length === 0 ? (
        <p className="text-lg text-gray-500">Belum ada banner tersedia.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="text-white bg-blue-700">
              <tr>
                <th className="px-6 py-4">No.</th>
                <th className="px-6 py-4">Preview</th>
                <th className="px-6 py-4">Nama</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {banners.map((b, index) => (
                <tr key={b.id} className="transition duration-200 border-b hover:bg-gray-50">
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={b.imageUrl}
                      alt={b.name}
                      className="object-cover w-40 h-24 border border-gray-200 rounded-lg shadow-sm"
                    />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{b.name}</td>
                  <td className="px-6 py-4 space-x-3">
                    <button
                      onClick={() => openEditModal(b)}
                      className="px-4 py-2 text-sm text-white transition duration-200 bg-yellow-500 rounded-lg hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(b.id)}
                      className="px-4 py-2 text-sm text-white transition duration-200 bg-red-500 rounded-lg hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div className="w-full max-w-md p-6 bg-white border border-gray-200 shadow-xl rounded-xl">
            <h2 className="mb-6 text-2xl font-bold text-gray-900">
              {editingId ? "✏️ Edit Banner" : "➕ Tambah Banner"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Nama Banner</label>
                <input
                  type="text"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700">Image URL</label>
                <input
                  type="url"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2 text-gray-700 transition duration-200 bg-gray-200 rounded-lg hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  {editingId ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
