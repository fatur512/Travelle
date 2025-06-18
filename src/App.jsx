import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./Home";
import NavbarUser from "./components/NavbarUser"; // Tambahkan Navbar

function App() {
  return (
    <BrowserRouter>
      <NavbarUser />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-gray-700">
              404 - Halaman Tidak Ditemukan
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
