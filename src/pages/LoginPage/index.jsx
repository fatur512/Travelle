import React, { useEffect, useState } from "react";
import useLogin from "../../hooks/useLogin";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState(""); // pindah ke sini
  const [password, setPassword] = useState(""); // pindah ke sini
  const { error, success, loading, user, getLogin } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await getLogin(email, password);
    if (result) {
      navigate("/");
    }
  };

  useEffect(() => {
    if (Cookies.get("isLoggedIn") === "true") {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div
      className="flex items-center justify-end min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="w-full mt-20 max-w-md p-8 bg-white shadow-lg mr-50 min-h-[610px] bg-opacity-90 rounded-xl">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Masuk ke Akun Anda</h2>

        <form className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="example@gmail.com"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Kata Sandi
            </label>
            <input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
          >
            Masuk
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Belum punya akun?{" "}
            <Link to="/register" className="text-indigo-600 cursor-pointer hover:underline">
              Daftar sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
