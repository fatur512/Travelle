import React from "react";
import useTransaction from "../../hooks/transaction/useTransaction";

export default function TransactionPage() {
  const { transactions, loading, error } = useTransaction();

  if (loading) {
    return <p className="mt-6 text-center text-gray-500">Memuat transaksi...</p>;
  }

  if (error) {
    return <p className="mt-6 text-center text-red-500">{error}</p>;
  }

  if (transactions.length === 0) {
    return <p className="mt-6 text-center text-gray-600">Belum ada transaksi.</p>;
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Riwayat Transaksi</h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {transactions.map((trx) => (
          <div key={trx.id} className="p-4 space-y-2 bg-white shadow rounded-xl">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Invoice: <strong>{trx.invoiceId}</strong>
              </span>
              <span>
                Status: <strong className="text-green-600 capitalize">{trx.status}</strong>
              </span>
            </div>

            <div className="text-sm text-gray-600">
              Tanggal Order: {new Date(trx.orderDate).toLocaleDateString("id-ID")}
            </div>

            <div className="text-sm font-medium text-gray-800">Total: Rp {trx.totalAmount.toLocaleString("id-ID")}</div>

            {/* Metode pembayaran */}
            <div className="flex items-center gap-2 mt-2">
              <img src={trx.payment_method?.imageUrl} alt={trx.payment_method?.name} className="w-6 h-6" />
              <span className="text-sm text-gray-700">{trx.payment_method?.name}</span>
            </div>

            {/* Daftar item */}
            <div className="grid grid-cols-1 gap-2 mt-3">
              {trx.transaction_items.map((item) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded bg-gray-50">
                  <img
                    src={item.imageUrls?.[0]}
                    alt={item.title}
                    className="object-cover w-16 h-16 rounded"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <div>
                    <div className="text-sm font-semibold">{item.title}</div>
                    <div className="text-xs text-gray-600">Qty: {item.quantity}</div>
                    <div className="text-xs text-gray-600">Rp {item.price.toLocaleString("id-ID")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
