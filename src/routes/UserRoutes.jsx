import React from "react";
import { Routes, Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";

import ProfilePage from "../pages/user/ProfilePage"; // Tambahkan
import CategoryListPage from "../pages/user/CategoryListPage";
import CategoryDetailPage from "../pages/user/CategoryDetailPage";
import ActivityListPage from "../pages/user/ActivityListPage";
import ActivityDetailPage from "../pages/user/ActivityDetailPage";
import UserDashboard from "../pages/user/HomeDashboard";
import BannerPage from "../pages/user/BannerPage";
import PromoPage from "../pages/user/PromoPage";
import CheckOutPage from "../pages/user/CheckOutPage";
import TransactionPage from "../pages/user/TransactionPage";
import UserCartPage from "../pages/user/userCartPage";
import HomeDashboard from "../pages/user/HomeDashboard";

export default function UserRoutes() {
  return (
    <Routes>
      {/* 🟢 Halaman dashboard user, bebas akses selama login */}
      <Route
        path="/"
        element={
          <ProtectedRoute allowedRole="user">
            <UserLayout>
              <HomeDashboard />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/banners"
        element={
          <ProtectedRoute>
            <UserLayout>
              <BannerPage />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* 🎉 Halaman Promo */}
      <Route
        path="/promo"
        element={
          <UserLayout>
            <PromoPage />
          </UserLayout>
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

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <UserLayout>
              <CheckOutPage />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-transactions"
        element={
          <ProtectedRoute allowedRole="user">
            <UserLayout>
              <TransactionPage />
            </UserLayout>
          </ProtectedRoute>
        }
      />

      {/* 🔍 Halaman detail aktivitas */}
      <Route
        path="/activity"
        element={
          <UserLayout>
            <ActivityListPage />
          </UserLayout>
        }
      />

      <Route
        path="/activity/:id"
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

      <Route
        path="/categories/:id"
        element={
          <UserLayout>
            <CategoryDetailPage />
          </UserLayout>
        }
      />
    </Routes>
  );
}
