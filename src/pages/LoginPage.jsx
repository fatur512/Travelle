import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useLogin from "../hooks/useLogin";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, success, loading, getLogin } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getLogin(email, password);
    if (result?.data?.role) {
      const role = result.data.role;
      navigate(role === "admin" ? "/admin" : "/");
    }
  };

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";
    const userCookie = Cookies.get("user");
    if (isLoggedIn && userCookie) {
      const role = JSON.parse(userCookie)?.role;
      navigate(role === "admin" ? "/admin/dashboard" : "/user/profile");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gradient-to-r from-sky-100 via-blue-50 to-white">
      {/* Mobile Branding */}
      <div className="flex flex-col items-center justify-center px-6 py-10 text-center md:hidden">
        <h1 className="mb-2 text-3xl font-extrabold text-blue-700">Travelle</h1>
        <p className="mb-4 text-sm font-medium text-blue-800">Gabung dan rencanakan liburan terbaikmu. 🏝️</p>
      </div>

      {/* Desktop Branding */}
      <div className="flex-col justify-center hidden w-1/2 px-12 bg-white shadow-md md:flex rounded-r-3xl">
        <div className="max-w-md">
          <h1 className="mb-4 text-4xl font-extrabold text-blue-600">Travelle</h1>
          <p className="mb-6 text-xl font-light leading-relaxed text-gray-700">
            Gabung dan rencanakan liburan terbaikmu. <br />
            ✈️ Tiket murah, hotel nyaman, dan petualangan seru – semua di satu tempat!
          </p>
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
            alt="Travel"
            className="w-full shadow-lg rounded-xl"
          />
        </div>
      </div>

      {/* Login Form */}
      <div className="flex items-center justify-center w-full px-6 md:w-1/2">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl animate-fade-in">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Masuk ke Travelle</h2>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Kata Sandi"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="text-sm text-center text-red-600">{error}</p>}
            {success && <p className="text-sm text-center text-green-600">{success}</p>}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-4 py-2 font-semibold text-white rounded-md transition ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Belum punya akun?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
                Daftar sekarang
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
