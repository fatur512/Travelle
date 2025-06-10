import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "tailwindcss";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Contoh rute lain berdasarkan struktur folder Anda */}
        <Route path="/login" element={<LoginPage.index />} />{" "}
        {/* Perhatikan .index jika komponen utamanya ada di index.jsx */}
        <Route path="/register" element={<RegisterPage.index />} />
        <Route path="/profile" element={<ProfilePage.index />} />
        {/* Anda bisa menambahkan rute lain di sini, misalnya untuk detail banner */}
        {/* <Route path="/banners/:id" element={<BannerDetailPage />} /> */}
        {/* Rute catch-all untuk halaman 404 (optional) */}
        <Route
          path="*"
          element={
            <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-gray-700">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
