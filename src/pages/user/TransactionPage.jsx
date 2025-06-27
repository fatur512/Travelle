import React, { useRef, useState } from "react";
import useTransaction from "../../hooks/transaction/useTransaction";
import { updateTransactionProof } from "../../services/transactionService";

export default function TransactionPage() {
  const { transactions, loading, error, refreshTransactions } = useTransaction();
  const inputRefs = useRef({});
  const [submittingId, setSubmittingId] = useState(null);

  const handleSubmitUrl = async (trxId) => {
    const url = inputRefs.current[trxId]?.value;
    if (!url || !url.startsWith("http")) {
      alert("❌ Masukkan URL yang valid diawali dengan http atau https");
      return;
    }

    setSubmittingId(trxId);
    try {
      await updateTransactionProof(trxId, url);
      alert("✅ Bukti pembayaran berhasil dikirim");
      refreshTransactions();
    } catch (err) {
      console.error("❌ Gagal update bukti pembayaran:", err);
      alert("❌ " + (err.message || "Terjadi kesalahan"));
    } finally {
      setSubmittingId(null);
    }
  };

  if (loading) return <p className="mt-6 text-center text-gray-500">Memuat transaksi...</p>;
  if (error) return <p className="mt-6 text-center text-red-500">{error}</p>;
  if (transactions.length === 0) return <p className="mt-6 text-center text-gray-600">Belum ada transaksi.</p>;

  return (
    <div className="min-h-screen px-6 py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="mb-10 text-3xl font-bold text-center text-gray-800">Riwayat Transaksi</h2>

        <div className="w-full overflow-x-auto bg-white shadow-md rounded-3xl">
          <table className="min-w-full text-sm text-left">
            <thead className="text-xs text-gray-500 uppercase bg-gray-100 border-b">
              <tr>
                <th className="px-6 py-4">Invoice</th>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Metode</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Detail</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {transactions.map((trx) => {
                const items = trx.transaction_items || [];
                const total = items.reduce((acc, item) => acc + (item.price || 0) * (item.quantity || 1), 0);

                return (
                  <tr key={trx.id} className="transition duration-200 border-b hover:bg-gray-50">
                    <td className="px-6 py-5 font-medium text-gray-800">{trx.invoiceId}</td>
                    <td className="px-6 py-5 text-gray-600">{new Date(trx.orderDate).toLocaleDateString("id-ID")}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        {trx.payment_method?.imageUrl && (
                          <img
                            src={trx.payment_method.imageUrl}
                            alt={trx.payment_method.name}
                            className="w-5 h-5 rounded-full"
                          />
                        )}
                        <span>{trx.payment_method?.name || "-"}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5 font-semibold text-gray-800">Rp {total.toLocaleString("id-ID")}</td>
                    <td className="px-6 py-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          trx.status === "success"
                            ? "bg-green-100 text-green-700"
                            : trx.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {trx.status}
                      </span>

                      {trx.status === "pending" && (
                        <div className="mt-3 space-y-2">
                          <input
                            type="text"
                            ref={(el) => (inputRefs.current[trx.id] = el)}
                            placeholder="Tempel URL bukti pembayaran"
                            className="w-full px-3 py-1 text-sm border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={() => handleSubmitUrl(trx.id)}
                            disabled={submittingId === trx.id}
                            className={`w-full px-3 py-1 text-xs text-white rounded ${
                              submittingId === trx.id
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                            }`}
                          >
                            {submittingId === trx.id ? "Mengirim..." : "Kirim Bukti Pembayaran"}
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <div className="space-y-2">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-2">
                            {item.imageUrls?.[0] ? (
                              <img
                                src={item.imageUrls[0]}
                                alt={item.title}
                                className="object-cover w-8 h-8 rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center justify-center w-8 h-8 text-xs bg-gray-200 rounded">
                                -
                              </div>
                            )}
                            <div className="text-xs">
                              <div className="font-medium text-gray-800">{item.title || "Tanpa Judul"}</div>
                              <div className="text-gray-600">
                                Qty: {item.quantity} – Rp {(item.price || 0).toLocaleString("id-ID")}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
