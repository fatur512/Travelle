import React, { useState } from "react";
import { Users, User, Image, Megaphone, Tag, Backpack, Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavbarAdmin() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentYear] = useState(new Date().getFullYear());
  const location = useLocation();
  const navigate = useNavigate();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const navItems = [
    { path: "/admin/profile", icon: User, label: "My Profile" },
    { path: "/admin/users", icon: Users, label: "List Users" },
    { path: "/admin/banner", icon: Image, label: "Banner" },
    { path: "/admin/promo", icon: Megaphone, label: "Promo" },
    { path: "/admin/category", icon: Tag, label: "Kategori" },
    { path: "/admin/activities", icon: Backpack, label: "Aktivitas" },
    { path: "/admin/transaction", icon: Backpack, label: "Transaksi" },
    // { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" }, // opsional
  ];

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("isLoggedIn");
    Cookies.remove("user");
    alert("Logout berhasil");
    navigate("/login");
  };

  return (
    <aside
      className={`fixed top-0 left-0 h-screen transition-all duration-200 ease-in-out ${
        isCollapsed ? "w-16" : "w-64"
      } bg-gray-900 text-white border-r border-gray-800 flex flex-col`}
    >
      {/* Header Sidebar */}
      <div className="flex items-center justify-between h-16 p-4 border-b border-gray-800">
        <div
          className={`text-2xl font-bold transition-all duration-200 overflow-hidden whitespace-nowrap ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
          }`}
        >
          Travelle
        </div>
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Menu Navigasi */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors duration-200 ${
                isActive ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              <item.icon size={20} className="flex-shrink-0" />
              {!isCollapsed && <span className="text-base font-medium whitespace-nowrap">{item.label}</span>}
            </Link>
          );
        })}

        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-4 p-3 mt-4 text-left rounded-lg text-red-400 hover:text-white hover:bg-red-600 transition-colors duration-200 ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="text-base font-medium whitespace-nowrap">Logout</span>}
        </button>
      </nav>

      {/* Footer */}
      <div
        className={`p-4 text-xs text-center border-t border-gray-800 transition-opacity duration-200 ${
          isCollapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        © {currentYear} Travelle Admin
      </div>
    </aside>
  );
}
