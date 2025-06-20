import React from "react";
import { Route } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";
import ProtectedRoute from "./ProtectedRoute";

import UserDashboard from "../pages/user/UserDashboard";
import ProfilePage from "../pages/user/ProfilePage";

export default function UserRoutes() {
  return (
    <>
      {/* 🟢 Halaman utama bebas diakses */}
      <Route
        path="/"
        element={
          <UserLayout>
            <UserDashboard />
          </UserLayout>
        }
      />

      {/* 🔒 Halaman profile tetap dilindungi */}
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
    </>
  );
}
