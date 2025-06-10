import React, { useState } from "react";
import useRegister from "../../hooks/useRegister";
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
      passwordRepeat, // koreksi nama field di sini
      role,
      profilePicture,
      phoneNumber,
    };

    const result = await getRegister(payload);
    if (result) {
      alert("Berhasil daftar. Silakan login.");
      navigate("/login"); // pindah navigate ke dalam if biar cuma jalan kalau berhasil
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen px-4 bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1350&q=80')",
      }}
    >
      <div className="w-full max-w-md p-8 mt-20 ml-auto mr-auto bg-white shadow-lg bg-opacity-90 rounded-xl lg:mr-46">
        <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Daftar Akun Baru</h2>

        <form onSubmit={handleSubmit} className="max-w-xs mx-auto space-y-6">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Kata Sandi"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Ulangi Kata Sandi"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={passwordRepeat}
            onChange={(e) => setPasswordRepeat(e.target.value)}
            required
          />

          {password && passwordRepeat && password !== passwordRepeat && (
            <p className="text-sm text-center text-red-600">Password tidak sama.</p>
          )}

          <select
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <input
            type="text"
            placeholder="URL Foto Profil"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />

          <input
            type="tel"
            placeholder="Nomor Telepon"
            className="w-full px-3 py-1.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          {error && <p className="text-sm text-center text-red-600">{error}</p>}
          {success && <p className="text-sm text-center text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-semibold text-white rounded-md ${
              loading ? "bg-indigo-300 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Memproses..." : "Daftar"}
          </button>

          <p className="mt-4 text-sm text-center text-gray-500">
            Sudah punya akun?{" "}
            <span className="text-indigo-600 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
              Masuk
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
