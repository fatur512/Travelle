import React from "react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";

export default function UserCartPage() {
  const { carts, loading, removeFromCart, updateQuantity } = useCart();

  const totalPrice = carts.reduce((acc, item) => {
    const price = item.activity?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-100">
      <Link to="/" className="text-blue-600 hover:underline">
        ← Back to Home
      </Link>

      <h2 className="mb-6 text-3xl font-bold text-center text-gray-800">Your Cart</h2>

      {loading ? (
        <p className="text-center text-gray-500">Loading cart...</p>
      ) : carts.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto space-y-4">
          {carts.map((item) => (
            <div key={item.id} className="flex gap-4 p-4 bg-white shadow rounded-xl">
              <img
                src={item.activity?.imageUrls?.[0]}
                alt={item.activity?.title}
                className="object-cover rounded-lg w-28 h-28"
                onError={(e) => (e.target.style.display = "none")}
              />
              <div className="flex-1">
                <h4 className="text-lg font-bold text-gray-800">{item.activity?.title}</h4>
                <p className="text-sm text-gray-600 line-clamp-2">{item.activity?.description}</p>

                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 text-sm text-white bg-gray-500 rounded hover:bg-gray-600 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="px-2 text-base font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 text-sm text-white bg-gray-700 rounded hover:bg-gray-800"
                  >
                    +
                  </button>
                </div>

                <p className="mt-2 text-sm font-bold text-blue-600">Rp {item.activity?.price.toLocaleString()}</p>
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
          ))}

          {/* Total dan Checkout */}
          <div className="p-4 mt-6 bg-white shadow rounded-xl">
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total:</span>
              <span>Rp {totalPrice.toLocaleString()}</span>
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
