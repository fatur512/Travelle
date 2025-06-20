import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import AdminLayout from "./layouts/AdminLayout";
import UserLayout from "./layouts/UserLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserDashboard from "./pages/user/userDashboard";
import LoginPage from "./pages/LoginPage";
import UserRoutes from "./routes/UserRoutes";

function App() {
  return (
    <Routes>
      {/* Route untuk user biasa */}
      <Route path="/login" element={<LoginPage />} />
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
        path="/admin"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
