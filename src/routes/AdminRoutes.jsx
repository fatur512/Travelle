import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminLayout from "../layouts/AdminLayout";
import ManageUser from "../pages/admin/ManageUser";
import AdminBannerPage from "../pages/admin/AdminBannerPage";
import AdminPromoPage from "../pages/admin/AdminPromoPage";
import AdminCategoryPage from "../pages/admin/AdminCategoryPage";
import ActivityAdminPage from "../pages/admin/ActivityAdminPage";
import ProfilePage from "../pages/user/ProfilePage";
import TransactionStatusAdminPage from "../pages/admin/TransactionStatusAdminPage";

export default function AdminRoutes() {
  return (
    <>
      <Route
        path="/admin/my-profile"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <ProfilePage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

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

      <Route
        path="/admin/category"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <AdminCategoryPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/activities"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <ActivityAdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/transactions"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <TransactionStatusAdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </>
  );
}
