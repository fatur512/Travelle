import React, { useState } from "react";
import usePaymentMethods from "../../hooks/paymentMethod/usePaymentMethods";
import { uploadTransactionImage } from "../../services/uploadService";
import { useLocation, useNavigate } from "react-router-dom";

export default function CheckOutPage() {
  const { paymentMethods, loading: paymentLoading, error } = usePaymentMethods();
  const location = useLocation();
  const navigate = useNavigate();

  const items = location.state?.items || [];
  const total = location.state?.total || 0;

  const [proofImageUrl, setProofImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const imageUrl = await uploadTransactionImage(file);
      setProofImageUrl(imageUrl);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Gagal upload gambar.");
    } finally {
      setUploading(false);
    }
  };

  const handleCheckout = () => {
    if (!selectedPayment) {
      alert("Silakan pilih metode pembayaran terlebih dahulu.");
      return;
    }

    if (!proofImageUrl) {
      alert("Silakan upload bukti pembayaran terlebih dahulu.");
      return;
    }

    if (items.length === 0) {
      alert("Tidak ada item yang dipilih untuk checkout.");
      return;
    }

    // Kirim ke backend (jika ada)
    console.log({
      items,
      total,
      paymentMethodId: selectedPayment,
      proofImageUrl,
    });

    alert("Checkout berhasil! Bukti pembayaran telah dikirim.");
    navigate("/"); // Redirect ke home
  };

  // Jika tidak ada data dari location.state
  if (items.length === 0 || total === 0) {
    return (
      <div className="min-h-screen px-4 py-8 text-center text-gray-600">
        <p className="mb-4">Tidak ada data checkout ditemukan. Silakan kembali ke keranjang.</p>
        <button
          onClick={() => navigate("/cart")}
          className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Kembali ke Keranjang
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      {/* Metode Pembayaran */}
      <div className="mb-6">
        <label className="block mb-2 text-sm font-semibold text-gray-700">Metode Pembayaran:</label>
        {paymentLoading ? (
          <p className="text-sm text-gray-500">Memuat metode pembayaran...</p>
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : paymentMethods.length === 0 ? (
          <p className="text-sm text-gray-500">Tidak ada metode pembayaran tersedia.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {paymentMethods.map((payment) => (
              <label
                key={payment.id}
                className={`flex items-center gap-4 p-3 border rounded-lg shadow-sm cursor-pointer hover:border-blue-500 transition-all ${
                  selectedPayment === payment.id ? "border-blue-600 ring-2 ring-blue-200" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={payment.id}
                  onChange={() => setSelectedPayment(payment.id)}
                  checked={selectedPayment === payment.id}
                  className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <img src={payment.imageUrl} alt={payment.name} className="h-10" />
                <span className="text-sm font-medium text-gray-700">{payment.name}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Total & Upload Section */}
      <div className="p-4 space-y-4 bg-white shadow rounded-xl">
        <div className="flex justify-between text-lg font-bold text-gray-800">
          <span>Total:</span>
          <span>Rp {total.toLocaleString("id-ID")}</span>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Upload Bukti Pembayaran:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
          {proofImageUrl && <img src={proofImageUrl} alt="Bukti" className="w-48 mt-2 rounded shadow" />}
        </div>

        <button
          onClick={handleCheckout}
          disabled={!selectedPayment || !proofImageUrl || uploading}
          className="w-full px-4 py-2 font-semibold text-white bg-green-600 rounded hover:bg-green-700 disabled:bg-gray-400"
        >
          {uploading ? "Mengupload..." : "Checkout"}
        </button>
      </div>
    </div>
  );
}
