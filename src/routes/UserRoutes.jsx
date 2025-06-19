import React from "react";
import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import UserLayout from "../layouts/UserLayout";

import UserDashboard from "../pages/user/UserDashboard";
import ProfilePage from "../pages/user/ProfilePage";

export default function UserRoutes() {
  return (
    <>
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
