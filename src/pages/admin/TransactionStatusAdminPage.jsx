import React, { useEffect, useState } from "react";
import { allTransactions, updateTransactionStatus, deleteTransaction } from "../../services/transactionService"; // Sesuaikan path

export default function TransactionStatusAdminPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState({}); // Menyimpan pilihan status tiap transaksi

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const res = await allTransactions();
      setTransactions(res?.data || []);
    } catch (err) {
      alert("Gagal memuat transaksi: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleStatusChange = (id, status) => {
    setSelectedStatus((prev) => ({
      ...prev,
      [id]: status,
    }));
  };

  const handleUpdateStatus = async (id, currentStatus) => {
    const newStatus = selectedStatus[id];
    if (!newStatus) {
      alert("Silakan pilih status terlebih dahulu.");
      return;
    }

    if (currentStatus !== "PENDING" && newStatus !== currentStatus) {
      alert("Status hanya dapat diubah jika saat ini adalah 'PENDING'.");
      return;
    }

    try {
      await updateTransactionStatus(id, newStatus);
      if (newStatus === "SUCCESS") {
        alert("Transaksi berhasil dibayar.");
      } else {
        alert(`Status berhasil diperbarui menjadi ${newStatus}.`);
      }
      loadTransactions();
    } catch (err) {
      alert("Gagal update status: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Yakin ingin hapus transaksi ini?")) {
      try {
        await deleteTransaction(id);
        alert("Transaksi dihapus.");
        loadTransactions();
      } catch (err) {
        alert("Gagal menghapus transaksi: " + err.message);
      }
    }
  };

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="mb-6 text-3xl font-bold">📦 Daftar Semua Transaksi</h1>
      {loading ? (
        <p>Memuat data transaksi...</p>
      ) : transactions.length === 0 ? (
        <p>Tidak ada transaksi ditemukan.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 transition border rounded-md shadow hover:shadow-lg">
              <h2 className="text-xl font-semibold">{tx.user?.name || "User Tanpa Nama"}</h2>
              <p className="text-gray-600">ID: {tx.id}</p>
              <p className="text-gray-600">Status: {tx.status}</p>
              <p className="text-gray-600">
                Metode: {tx.paymentMethod?.type || "-"} - {tx.paymentMethod?.name || "-"}
              </p>
              <div className="flex items-center gap-2 mt-3">
                <select
                  value={selectedStatus[tx.id] || ""}
                  onChange={(e) => handleStatusChange(tx.id, e.target.value)}
                  className="px-2 py-1 border rounded"
                >
                  <option value="">-- Pilih Status --</option>
                  <option value="SUCCESS">SUCCESS</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
                <button
                  onClick={() => handleUpdateStatus(tx.id, tx.status)}
                  className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Update Status
                </button>
                <button
                  onClick={() => handleDelete(tx.id)}
                  className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
