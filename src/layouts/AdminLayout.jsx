// src/layouts/AdminLayout.jsx
import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <NavbarAdmin />
      <main className="w-full min-h-screen p-8 ml-64 bg-blue-50">{children}</main>
    </div>
  );
}
