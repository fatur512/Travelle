import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import UserDashboard from "./pages/user/userDashboard";
import LoginPage from "./pages/LoginPage";
import UserRoutes from "./routes/UserRoutes";
import RegisterPage from "./pages/RegisterPage";
import ManageUser from "./pages/admin/ManageUser";
import AdminBannerPage from "./pages/admin/AdminBannerPage";
import AdminPromoPage from "./pages/admin/AdminPromoPage";
import AdminCategoryPage from "./pages/admin/AdminCategoryPage";
import ActivityAdminPage from "./pages/admin/ActivityAdminPage";
import ProfilePage from "./pages/user/ProfilePage";
import TransactionStatusAdminPage from "./pages/admin/TransactionStatusAdminPage";

function App() {
  return (
    <Routes>
      {/* Route untuk user biasa */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute allowedRole="user">
            <UserLayout>
              <UserDashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />
      <Route path="/*" element={<UserRoutes />} />

      {/* Route untuk admin */}
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
        path="/admin/profile"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <ProfilePage />
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
        path="/admin/transaction"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <TransactionStatusAdminPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
