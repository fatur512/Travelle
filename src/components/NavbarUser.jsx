import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // atau ganti dengan ikon lain yang kamu pakai
import { useCart } from "../context/CartContext";

export default function NavbarUser() {
  const { carts } = useCart();

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo atau Judul */}
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Travelle
      </Link>

      {/* Navigasi kanan */}
      <div className="relative">
        <Link to="/cart" className="flex items-center text-gray-700 hover:text-blue-600">
          <ShoppingCart className="w-6 h-6" />
          {/* Badge jumlah cart */}
          {carts.length > 0 && (
            <span className="absolute top-[-6px] right-[-6px] bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
              {carts.length}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}
