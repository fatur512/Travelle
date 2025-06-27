import React, { useEffect, useState } from "react";
import { createCategory, deleteCategory, fetchCategories, updateCategory } from "../../services/categoriesService";

export default function AdminCategoryPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", imageUrl: "" });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setError("Gagal memuat kategori. Silakan coba lagi nanti.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const categoryData = { name: form.name, imageUrl: form.imageUrl };

    try {
      if (editingId) {
        await updateCategory(editingId, categoryData);
      } else {
        await createCategory(categoryData);
      }
      setForm({ name: "", imageUrl: "" });
      setEditingId(null);
      setShowModal(false);
      await loadCategories();
    } catch (err) {
      console.error("Failed to save category:", err);
      setError("Gagal menyimpan kategori. Periksa koneksi atau data Anda.");
    }
  };

  const handleEdit = (category) => {
    setForm({ name: category.name, imageUrl: category.imageUrl });
    setEditingId(category.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin menghapus kategori ini?")) {
      try {
        await deleteCategory(id);
        await loadCategories();
      } catch (err) {
        console.error("Failed to delete category:", err);
        setError("Gagal menghapus kategori. Coba lagi nanti.");
      }
    }
  };

  const openCreateModal = () => {
    setForm({ name: "", imageUrl: "" });
    setEditingId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({ name: "", imageUrl: "" });
    setEditingId(null);
    setError(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-black" aria-live="polite">
        <div className="w-12 h-12 border-4 border-white rounded-full border-t-transparent animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen px-4 py-8 bg-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between mb-8 sm:flex-row sm:mb-12">
          <h1 className="text-3xl font-semibold text-black sm:text-4xl" role="heading" aria-level="1">
            📂 Manajemen Kategori
          </h1>
          <button
            onClick={openCreateModal}
            className="w-full px-6 py-3 mt-6 text-black transition-all duration-200 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-white sm:mt-0 sm:w-auto sm:focus:ring-offset-2"
            aria-label="Tambah Kategori Baru"
          >
            + Tambah Kategori
          </button>
        </div>

        {error && (
          <div className="p-4 mb-6 text-sm text-red-400 bg-gray-800 rounded-lg" role="alert">
            {error}
          </div>
        )}

        {categories.length === 0 && !loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-400 sm:text-xl" role="status">
              Tidak ada kategori.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="p-4 transition-all duration-200 border rounded-lg shadow-md bg-gray-100/10 hover:shadow-lg border-gray-800/20 hover:border-gray-700/30"
                role="region"
                aria-label={`Kategori ${category.name}`}
              >
                <img
                  src={category.imageUrl}
                  alt={`Gambar ${category.name}`}
                  className="object-cover w-full h-56 mb-4 transition-opacity duration-200 rounded-lg hover:opacity-90"
                />
                <h3 className="mb-2 text-lg font-semibold text-black" role="heading" aria-level="2">
                  {category.name}
                </h3>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-3 py-1 text-sm text-white transition-colors duration-200 bg-gray-500 rounded hover:bg-gray-600"
                    aria-label={`Edit ${category.name}`}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="px-3 py-1 text-sm text-white transition-colors duration-200 rounded bg-indigo-950 hover:bg-indigo-800"
                    aria-label={`Hapus ${category.name}`}
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {showModal && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-100"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <div className="w-full max-w-md p-6 bg-gray-950 border border-gray-700 rounded-xl shadow-xl overflow-y-auto max-h-[85vh]">
              <h2 id="modal-title" className="mb-5 text-2xl font-semibold text-white">
                {editingId ? "✏️ Edit Kategori" : "➕ Tambah Kategori"}
              </h2>
              <form onSubmit={handleCreateOrUpdate} className="space-y-6" noValidate>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Nama</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Nama Kategori"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">URL Gambar</label>
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="URL Gambar"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
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
                    aria-label={editingId ? "Update Kategori" : "Tambah Kategori"}
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
