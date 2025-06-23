import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function NavbarUser() {
  const { carts } = useCart();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // Hitung total item dari semua quantity
  const totalItems = carts.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Tutup dropdown saat klik di luar
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-extrabold tracking-wide text-blue-600">
        Travelle
      </Link>

      {/* Menu */}
      <div className="flex gap-6 text-sm font-medium text-gray-700">
        <Link to="/banners" className="transition-colors hover:text-blue-600">
          Banner
        </Link>
        <Link to="/promo" className="transition-colors hover:text-blue-600">
          Promo
        </Link>
        <Link to="/categories" className="transition-colors hover:text-blue-600">
          Category
        </Link>
        <Link to="/activity" className="transition-colors hover:text-blue-600">
          Activities
        </Link>
      </div>

      {/* Cart & Profile */}
      <div className="relative flex items-center gap-5">
        {/* Cart Icon */}
        <Link to="/cart" className="relative group">
          <ShoppingCart className="w-6 h-6 text-gray-700 transition-colors group-hover:text-blue-600" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full shadow">
              {totalItems}
            </span>
          )}
        </Link>

        {/* User Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            aria-expanded={dropdownOpen}
            className="group focus:outline-none"
          >
            <User className="w-6 h-6 text-gray-700 transition-colors group-hover:text-blue-600" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 z-10 mt-2 bg-white border rounded shadow-md w-44">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                Profile
              </Link>
              <Link
                to="/my-transactions"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => setDropdownOpen(false)}
              >
                My Transactions
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
