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

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen px-4 py-8 bg-white sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between mb-8 sm:flex-row sm:mb-12">
          <h1 className="text-3xl font-semibold text-black sm:text-4xl" role="heading" aria-level="1">
            🎉 Admin Promo Management
          </h1>
          <button
            onClick={openCreateModal}
            className="w-full px-6 py-3 mt-6 text-black transition-all duration-200 bg-gray-100 rounded-lg hover:bg-gray-200 focus:ring-2 focus:ring-white sm:mt-0 sm:w-auto sm:focus:ring-offset-2"
            aria-label="Tambah Promo Baru"
          >
            + Tambah Promo
          </button>
        </div>

        {promos.length === 0 && !loading ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-400 sm:text-xl" role="status">
              No promos available.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
            <table className="min-w-full text-sm text-left table-auto">
              <thead className="text-white bg-gray-800">
                <tr>
                  <th className="px-4 py-3 sm:px-6">No.</th>
                  <th className="px-4 py-3 sm:px-6">Title</th>
                  <th className="px-4 py-3 sm:px-6">Code</th>
                  <th className="px-4 py-3 sm:px-6">Discount</th>
                  <th className="px-4 py-3 sm:px-6">Min Claim</th>
                  <th className="px-4 py-3 sm:px-6">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-900">
                {promos.map((promo, index) => (
                  <tr key={promo.id} className="transition duration-200 border-b hover:bg-gray-50">
                    <td className="px-4 py-4 sm:px-6">{index + 1}</td>
                    <td className="px-4 py-4 font-medium sm:px-6">{promo.title}</td>
                    <td className="px-4 py-4 sm:px-6">{promo.promo_code}</td>
                    <td className="px-4 py-4 sm:px-6">Rp{promo.promo_discount_price}</td>
                    <td className="px-4 py-4 sm:px-6">Rp{promo.minimum_claim_price}</td>
                    <td className="px-4 py-4 space-x-2 sm:px-6 sm:space-x-3">
                      <button
                        onClick={() => handleEdit(promo)}
                        className="px-3 py-1 text-sm text-white transition-colors duration-200 bg-gray-500 rounded hover:bg-gray-600"
                        aria-label={`Edit ${promo.title}`}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(promo.id)}
                        className="px-3 py-1 text-sm text-white transition-colors duration-200 rounded bg-indigo-950 hover:bg-indigo-800"
                        aria-label={`Hapus ${promo.title}`}
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
                {editingId ? "✏️ Edit Promo" : "➕ Tambah Promo"}
              </h2>
              <form onSubmit={handleCreateOrUpdate} className="space-y-6" noValidate>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Title"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Description"
                    className="w-full h-16 p-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg resize-none sm:h-20 focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Image URL</label>
                  <input
                    type="url"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="Image URL"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Terms & Conditions</label>
                  <textarea
                    value={form.terms_condition}
                    onChange={(e) => setForm({ ...form, terms_condition: e.target.value })}
                    placeholder="Terms & Conditions"
                    className="w-full h-16 p-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg resize-none sm:h-20 focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Promo Code</label>
                  <input
                    type="text"
                    value={form.promo_code}
                    onChange={(e) => setForm({ ...form, promo_code: e.target.value })}
                    placeholder="Promo Code"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Discount Price</label>
                  <input
                    type="number"
                    value={form.promo_discount_price}
                    onChange={(e) => setForm({ ...form, promo_discount_price: e.target.value })}
                    placeholder="Discount Price"
                    className="w-full px-4 py-2 text-sm text-white bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-white sm:text-base"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-white sm:text-base">Minimum Claim Price</label>
                  <input
                    type="number"
                    value={form.minimum_claim_price}
                    onChange={(e) => setForm({ ...form, minimum_claim_price: e.target.value })}
                    placeholder="Minimum Claim Price"
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
                    aria-label={editingId ? "Update Promo" : "Tambah Promo"}
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
