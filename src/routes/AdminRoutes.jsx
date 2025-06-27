import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import ManageUser from "../pages/admin/ManageUser";
import AdminBannerPage from "../pages/admin/AdminBannerPage";
import AdminPromoPage from "../pages/admin/AdminPromoPage";

export default function AdminRoutes() {
  return (
    <>
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <ManageUser />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/banner"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <AdminBannerPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/promo"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <AdminPromoPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </>
  );
}
