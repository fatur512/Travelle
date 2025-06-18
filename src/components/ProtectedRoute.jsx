import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children, allowedRole }) {
  const token = Cookies.get("token");
  const userData = Cookies.get("user");
  const role = userData ? JSON.parse(userData).role : null;

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}
