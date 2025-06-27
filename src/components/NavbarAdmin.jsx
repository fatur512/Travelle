import React from "react";
import { Home, Users, BookOpen, FileText, Settings, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

export default function NavbarAdmin() {
  return (
    <aside className="fixed top-0 left-0 flex flex-col w-64 h-screen text-white bg-blue-700">
      <div className="p-6 text-2xl font-bold border-b border-blue-500">
        <span>Travelle</span>
      </div>
      <nav className="flex-1 p-4 space-y-4">
        <Link to="/admin/users" className="flex items-center gap-3 p-2 rounded hover:bg-blue-600">
          <Users size={20} /> List Users
        </Link>
        <Link to="/admin/banner" className="flex items-center gap-3 p-2 rounded hover:bg-blue-600">
          <BookOpen size={20} /> Banner
        </Link>
        <Link to="/admin/promo" className="flex items-center gap-3 p-2 rounded hover:bg-blue-600">
          <BookOpen size={20} /> Promo
        </Link>
      </nav>
      <div className="p-4 text-sm text-center border-t border-blue-500">© 2025 Travelle Admin</div>
    </aside>
  );
}
