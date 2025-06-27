import React, { useEffect, useState } from "react";
import { createPromo, deletePromo, fetchPromos, updatePromo } from "../../services/promoService";

export default function AdminPromoPage() {
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = async () => {
    setLoading(true);
    try {
      const data = await fetchPromos();
      setPromos(data);
    } catch (err) {
      console.error("Failed to load promos:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();
    const promoData = { ...form };

    try {
      if (editingId) {
        await updatePromo(editingId, promoData);
      } else {
        await createPromo(promoData);
      }
      setForm({
        title: "",
        description: "",
        imageUrl: "",
        terms_condition: "",
        promo_code: "",
        promo_discount_price: "",
        minimum_claim_price: "",
      });
      setEditingId(null);
      setShowModal(false);
      await loadPromos();
    } catch (err) {
      console.error("Failed to save promo:", err);
      alert("Failed to save promo.");
    }
  };

  const handleEdit = (promo) => {
    setForm({
      title: promo.title,
      description: promo.description,
      imageUrl: promo.imageUrl,
      terms_condition: promo.terms_condition,
      promo_code: promo.promo_code,
      promo_discount_price: promo.promo_discount_price,
      minimum_claim_price: promo.minimum_claim_price,
    });
    setEditingId(promo.id);
    setShowModal(true);
  };

  const handleDelete = async (promoId) => {
    if (confirm("Yakin ingin menghapus promo ini?")) {
      try {
        await deletePromo(promoId);
        await loadPromos();
        alert("Promo berhasil dihapus.");
      } catch (err) {
        console.error("Failed to delete promo:", err);
        alert("Failed to delete promo.");
      }
    }
  };

  const openCreateModal = () => {
    setForm({
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_code: "",
      promo_discount_price: "",
      minimum_claim_price: "",
    });
    setEditingId(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setForm({
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_code: "",
      promo_discount_price: "",
      minimum_claim_price: "",
    });
    setEditingId(null);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-gradient-to-br from-gray-50 to-white">
      <div className="flex flex-col items-center justify-between mb-6 sm:flex-row sm:mb-8">
        <h1 className="flex items-center text-3xl font-bold text-blue-800 sm:text-4xl">🎉 Admin Promo Management</h1>
        <button
          onClick={openCreateModal}
          className="w-full px-4 py-2 mt-4 text-white transition duration-300 bg-blue-600 rounded-lg shadow-md sm:mt-0 sm:px-6 sm:py-3 hover:bg-blue-700 sm:w-auto"
        >
          + Tambah Promo
        </button>
      </div>

      {promos.length === 0 && !loading ? (
        <p className="text-lg text-gray-500">No promos available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
          <table className="min-w-full text-sm text-left table-auto">
            <thead className="text-white bg-blue-700">
              <tr>
                <th className="px-4 py-3 sm:px-6">No.</th>
                <th className="px-4 py-3 sm:px-6">Title</th>
                <th className="px-4 py-3 sm:px-6">Code</th>
                <th className="px-4 py-3 sm:px-6">Discount</th>
                <th className="px-4 py-3 sm:px-6">Min Claim</th>
                <th className="px-4 py-3 sm:px-6">Aksi</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {promos.map((promo, index) => (
                <tr key={promo.id} className="transition duration-200 border-b hover:bg-gray-50">
                  <td className="px-4 py-4 sm:px-6">{index + 1}</td>
                  <td className="px-4 py-4 font-medium text-gray-900 sm:px-6">{promo.title}</td>
                  <td className="px-4 py-4 sm:px-6">{promo.promo_code}</td>
                  <td className="px-4 py-4 sm:px-6">Rp{promo.promo_discount_price}</td>
                  <td className="px-4 py-4 sm:px-6">Rp{promo.minimum_claim_price}</td>
                  <td className="px-4 py-4 space-x-2 sm:px-6 sm:space-x-3">
                    <button
                      onClick={() => handleEdit(promo)}
                      className="px-2 py-1 text-xs text-white transition duration-200 bg-yellow-500 rounded-lg sm:px-4 sm:py-2 sm:text-sm hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(promo.id)}
                      className="px-2 py-1 text-xs text-white transition duration-200 bg-red-500 rounded-lg sm:px-4 sm:py-2 sm:text-sm hover:bg-red-600"
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
          <div className="w-full max-w-md p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-xl overflow-y-auto max-h-[80vh] sm:max-h-[85vh]">
            <h2 className="mb-4 text-xl font-bold text-gray-900 sm:mb-6 sm:text-2xl">
              {editingId ? "✏️ Edit Promo" : "➕ Tambah Promo"}
            </h2>
            <form onSubmit={handleCreateOrUpdate} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 sm:mb-2 sm:text-base">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Title"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg sm:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 sm:mb-2 sm:text-base">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Description"
                  className="w-full h-16 p-2 text-sm border border-gray-300 rounded-lg resize-none sm:h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 sm:mb-2 sm:text-base">Image URL</label>
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                  placeholder="Image URL"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg sm:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 sm:mb-2 sm:text-base">
                  Terms & Conditions
                </label>
                <textarea
                  value={form.terms_condition}
                  onChange={(e) => setForm({ ...form, terms_condition: e.target.value })}
                  placeholder="Terms & Conditions"
                  className="w-full h-16 p-2 text-sm border border-gray-300 rounded-lg resize-none sm:h-20 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 sm:mb-2 sm:text-base">Promo Code</label>
                <input
                  type="text"
                  value={form.promo_code}
                  onChange={(e) => setForm({ ...form, promo_code: e.target.value })}
                  placeholder="Promo Code"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg sm:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 sm:mb-2 sm:text-base">
                  Discount Price
                </label>
                <input
                  type="number"
                  value={form.promo_discount_price}
                  onChange={(e) => setForm({ ...form, promo_discount_price: e.target.value })}
                  placeholder="Discount Price"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg sm:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-gray-700 sm:mb-2 sm:text-base">
                  Minimum Claim Price
                </label>
                <input
                  type="number"
                  value={form.minimum_claim_price}
                  onChange={(e) => setForm({ ...form, minimum_claim_price: e.target.value })}
                  placeholder="Minimum Claim Price"
                  className="w-full p-2 text-sm border border-gray-300 rounded-lg sm:p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 mt-3 sm:gap-4 sm:mt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-3 py-1 text-xs text-gray-700 transition duration-200 bg-gray-200 rounded-lg sm:px-4 sm:py-2 hover:bg-gray-300 sm:text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 text-xs text-white transition duration-200 bg-blue-600 rounded-lg sm:px-4 sm:py-2 hover:bg-blue-700 sm:text-sm"
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
