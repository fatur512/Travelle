import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children, allowedRole }) {
  const role = Cookies.get("role");

  if (allowedRole && role !== allowedRole) {
    alert("❌ Kamu tidak memiliki akses ke halaman ini.");

    return role === "admin" ? <Navigate to="/admin/dashboard" replace /> : <Navigate to="/user/dashboard" replace />;
  }

  return children;
}
