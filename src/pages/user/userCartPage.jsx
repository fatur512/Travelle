import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function UserCartPage() {
  const { carts, loading, removeFromCart, updateQuantity } = useCart();

  const totalPrice = carts.reduce((acc, item) => {
    const price = typeof item.activity?.price === "number" ? item.activity.price : 0;
    const qty = item.quantity || 1;
    return acc + price * qty;
  }, 0);

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
        <div className="max-w-3xl mx-auto space-y-4">
          {carts
            .filter((item) => item.activity) // pastikan activity tidak null
            .map((item) => {
              const activity = item.activity;
              const imageUrl = activity.imageUrls?.[0] || null;
              const quantity = item.quantity || 1;

              return (
                <div key={item.id} className="flex gap-4 p-4 bg-white shadow rounded-xl">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={activity.title || "Image"}
                      className="object-cover rounded w-28 h-28"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                  ) : (
                    <div className="flex items-center justify-center text-sm text-gray-500 bg-gray-200 rounded w-28 h-28">
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
                        onClick={() => updateQuantity(item.id, Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="px-2 py-1 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="px-2 text-base font-medium">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, quantity + 1)}
                        className="px-2 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-800"
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-2 text-sm font-bold text-blue-600">Rp {activity.price?.toLocaleString("id-ID")}</p>
                  </div>

                  <div className="flex items-start">
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

          {/* Total dan Checkout */}
          <div className="p-4 mt-6 bg-white shadow rounded-xl">
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span>Rp {totalPrice.toLocaleString("id-ID")}</span>
            </div>
            <button className="w-full px-4 py-2 mt-4 text-white bg-green-600 rounded hover:bg-green-700">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
