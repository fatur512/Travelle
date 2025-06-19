import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ children, allowedRole }) {
  const userCookie = Cookies.get("user");
  if (!userCookie) return <Navigate to="/login" />;

  const user = JSON.parse(userCookie);
  if (user.role !== allowedRole) return <Navigate to="/login" />;

  return children;
}
