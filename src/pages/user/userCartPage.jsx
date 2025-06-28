import React, { useState } from "react";
import { useCart } from "../../context/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function UserCartPage() {
  const { carts, loading, removeFromCart, updateQuantity } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const navigate = useNavigate();

  const isAllSelected = carts.length > 0 && selectedItems.length === carts.length;
  const handleCheckboxChange = (itemId) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  const handleSelectAll = () => {
    const allIds = carts.map((item) => item.id);
    setSelectedItems(isAllSelected ? [] : allIds);
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setUpdatingId(itemId);
    try {
      await updateQuantity(itemId, newQuantity);
    } catch (error) {
      console.error("❌ Gagal update quantity:", error);
      alert("Gagal memperbarui jumlah item.");
    } finally {
      setUpdatingId(null);
    }
  };

  const selectedCartItems = carts.filter((item) => selectedItems.includes(item.id));
  const totalSelectedPrice = selectedCartItems.reduce((acc, item) => {
    const price = typeof item.activity?.price === "number" ? item.activity.price : 0;
    const qty = item.quantity || 1;
    return acc + price * qty;
  }, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) {
      alert("Silakan pilih item yang ingin di-checkout.");
      return;
    }
    navigate("/checkout", {
      state: {
        items: selectedCartItems,
        total: totalSelectedPrice,
        cartIds: selectedItems, // ✅ Kirim cartIds
      },
    });
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>
      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Your Cart ({carts.length} items)</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading cart...</p>
      ) : carts.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-2 p-2 bg-white shadow rounded-xl">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={handleSelectAll}
              className="w-5 h-5 text-blue-600"
            />
            <label className="text-sm font-medium text-gray-700">Pilih Semua</label>
          </div>

          {carts
            .filter((item) => item.activity)
            .map((item) => {
              const { activity, quantity = 1 } = item;
              const imageUrl = activity.imageUrls?.[0] || null;
              const isChecked = selectedItems.includes(item.id);

              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 p-4 bg-white shadow rounded-xl ${
                    isChecked ? "border-blue-500 border-2" : ""
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCheckboxChange(item.id)}
                    className="w-5 h-5 text-blue-600"
                  />
                  {imageUrl ? (
                    <img src={imageUrl} alt={activity.title || "Image"} className="object-cover w-24 h-24 rounded" />
                  ) : (
                    <div className="flex items-center justify-center w-24 h-24 text-sm text-gray-500 bg-gray-200 rounded">
                      No Image
                    </div>
                  )}

                  <div className="flex-1">
                    <Link to={`/activity/${activity.id}`}>
                      <h4 className="text-lg font-bold text-blue-700 hover:underline">{activity.title}</h4>
                    </Link>
                    <p className="text-sm text-gray-600 line-clamp-2">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, quantity - 1)}
                        disabled={updatingId === item.id}
                        className="px-2 py-1 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-2 text-base font-medium">{quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, quantity + 1)}
                        disabled={updatingId === item.id}
                        className="px-2 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>
                    <p className="mt-2 text-sm font-bold text-blue-600">
                      Rp {activity.price?.toLocaleString("id-ID") || 0}
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="px-3 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              );
            })}

          <div className="p-4 space-y-4 bg-white shadow rounded-xl">
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total yang Dipilih:</span>
              <span>Rp {totalSelectedPrice.toLocaleString("id-ID") || 0}</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className={`w-full px-4 py-2 font-semibold text-white rounded transition ${
                selectedItems.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Checkout
            </button>

            {selectedItems.length === 0 && (
              <p className="text-sm text-center text-gray-500">Silakan pilih item terlebih dahulu sebelum checkout.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
