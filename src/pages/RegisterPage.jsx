import React, { useState } from "react";
import useRegister from "../hooks/useRegister";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("user");
  const [profilePicture, setProfilePicture] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { getRegister, error, success, loading } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordRepeat) {
      alert("Password tidak sama.");
      return;
    }

    const payload = {
      name,
      email,
      password,
      passwordRepeat,
      role,
      profilePicture,
      phoneNumber,
    };

    const result = await getRegister(payload);
    if (result) {
      alert("Berhasil daftar. Silakan login.");
      navigate("/login");
    }
  };

  return (
    <div className="flex flex-col min-h-screen md:flex-row bg-gradient-to-r from-sky-100 via-blue-50 to-white">
      {/* Mobile Branding */}
      <div className="flex flex-col items-center justify-center p-6 text-center md:hidden">
        <h1 className="mb-2 text-3xl font-extrabold text-blue-600">Travelle</h1>
        <p className="mb-4 text-sm text-gray-700">Gabung dan rencanakan liburan terbaikmu. 🏝️</p>
        {/* Foto hanya muncul di desktop */}
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1000&q=80"
          alt="Travel"
          className="hidden w-full max-w-xs rounded-lg shadow-md md:block"
        />
      </div>

      {/* Desktop Branding */}
      <div className="flex-col justify-center hidden w-1/2 px-12 bg-white shadow-md md:flex rounded-r-3xl">
        <div className="max-w-md">
          <h1 className="mb-4 text-4xl font-extrabold text-blue-600">Travelle</h1>
          <p className="mb-6 text-xl font-light leading-relaxed text-gray-700">
            Gabung dan rencanakan liburan terbaikmu. <br />
            🏝️ Satu akun untuk ribuan destinasi menarik!
          </p>
          <img src="..." alt="Travel" className="hidden w-full max-w-xs rounded-lg shadow-md md:block" />
        </div>
      </div>

      {/* Form Register */}
      <div className="flex items-center justify-center w-full px-6 md:w-1/2">
        <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl animate-fade-in">
          <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Daftar Akun Travelle</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Nama Lengkap"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
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
            <input
              type="password"
              placeholder="Ulangi Kata Sandi"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={passwordRepeat}
              onChange={(e) => setPasswordRepeat(e.target.value)}
              required
            />
            {password && passwordRepeat && password !== passwordRepeat && (
              <p className="text-sm text-center text-red-600">Password tidak sama.</p>
            )}
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <input
              type="text"
              placeholder="URL Foto Profil"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Nomor Telepon"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              {loading ? "Memproses..." : "Daftar"}
            </button>

            <p className="text-sm text-center text-gray-600">
              Sudah punya akun?{" "}
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
                Masuk
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
