import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";

import UserDashboard from "../pages/user/UserDashboard";
import ProfilePage from "../pages/user/ProfilePage";
import UserCartPage from "../pages/user/UserCartPage"; // Tambahkan jika ada
import ActivityDetailPage from "../pages/user/ActivityDetailPage";
import CategoryListPage from "../pages/user/CategoryListPage";

export default function UserRoutes() {
  return (
    <Routes>
      {/* 🟢 Halaman dashboard user, bebas akses selama login */}
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

      {/* 🔒 Halaman profil, hanya untuk user */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute allowedRole="user">
            <UserLayout>
              <ProfilePage />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* 🛒 Halaman cart */}
      <Route
        path="/cart"
        element={
          <ProtectedRoute allowedRole="user">
            <UserLayout>
              <UserCartPage />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* 🔍 Halaman detail aktivitas */}
      <Route
        path="/activity"
        element={
          <UserLayout>
            <ActivityDetailPage />
          </UserLayout>
        }
      />
      {/* 🟢 Halaman kategori, bebas akses */}
      <Route
        path="/categories"
        element={
          <UserLayout>
            <CategoryListPage />
          </UserLayout>
        }
      />
    </Routes>
  );
}
