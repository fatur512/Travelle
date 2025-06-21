import React from "react";
import { Link } from "react-router-dom";

export default function NavbarUser() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        Travelle
      </Link>

      <div className="flex gap-6 text-sm font-medium text-gray-700">
        <Link to="/banner" className="hover:text-blue-600">
          Banner
        </Link>
        <Link to="/promo" className="hover:text-blue-600">
          Promo
        </Link>
        <Link to="/categories" className="hover:text-blue-600">
          Category
        </Link>
        <Link to="/activity" className="hover:text-blue-600">
          Activities
        </Link>
      </div>

      <Link to="/profile" className="text-gray-700 hover:text-blue-600">
        👤 Profile
      </Link>
    </nav>
  );
}
