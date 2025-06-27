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
    <div className="min-h-screen px-4 py-8 bg-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between mb-8 sm:flex-row sm:mb-12">
          <h1 className="text-3xl font-semibold text-black sm:text-4xl" role="heading" aria-level="1">
            🎨 Admin Banner Management
          </h1>
          <button
            onClick={openCreateModal}
            className="w-full px-6 py-3 mt-6 text-black transition-all duration-200 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-white sm:mt-0 sm:w-auto sm:focus:ring-offset-2"
            aria-label="Tambah Banner Baru"
          >
            + Tambah Banner
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-400 sm:text-xl" role="status">
              Loading...
            </p>
          </div>
        ) : banners.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-400 sm:text-xl" role="status">
              Belum ada banner tersedia.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
            <table className="min-w-full text-sm text-left table-auto">
              <thead className="text-white bg-gray-800">
                <tr>
                  <th className="px-4 py-3 sm:px-6">No.</th>
                  <th className="px-4 py-3 sm:px-6">Preview</th>
                  <th className="px-4 py-3 sm:px-6">Nama</th>
                  <th className="px-4 py-3 sm:px-6">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {banners.map((b, index) => (
                  <tr key={b.id} className="transition duration-200 border-b hover:bg-gray-50">
                    <td className="px-4 py-4 sm:px-6">{index + 1}</td>
                    <td className="px-4 py-4 sm:px-6">
                      <img
                        src={b.imageUrl}
                        alt={b.name}
                        className="object-cover w-40 h-24 border border-gray-200 rounded-lg shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-4 font-medium sm:px-6">{b.name}</td>
                    <td className="px-4 py-4 space-x-2 sm:px-6 sm:space-x-3">
                      <button
                        onClick={() => openEditModal(b)}
                        className="px-3 py-1 text-sm text-white transition-colors duration-200 bg-gray-500 rounded hover:bg-gray-600"
                        aria-label={`Edit ${b.name}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="px-3 py-1 text-sm text-white transition-colors duration-200 rounded bg-indigo-950 hover:bg-indigo-800"
                        aria-label={`Hapus ${b.name}`}
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
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-70"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <div className="w-full max-w-md p-6 bg-gray-950 border border-gray-700 rounded-xl shadow-xl overflow-y-auto max-h-[85vh]">
              <h2 id="modal-title" className="mb-5 text-2xl font-semibold text-white">
                {editingId ? "✏️ Edit Banner" : "➕ Tambah Banner"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Nama Banner</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    aria-required="true"
                    placeholder="Nama Banner"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Image URL</label>
                  <input
                    type="url"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    required
                    aria-required="true"
                    placeholder="Image URL"
                  />
                </div>
                <div className="flex justify-end gap-4 mt-6">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-sm text-gray-300 transition-colors duration-200 bg-gray-600 rounded-lg hover:bg-gray-500"
                    aria-label="Tutup Modal"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm text-black transition-colors duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
                    aria-label={editingId ? "Update Banner" : "Tambah Banner"}
                  >
                    {editingId ? "Update" : "Tambah"}
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
