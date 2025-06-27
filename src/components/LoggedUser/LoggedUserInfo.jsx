import React, { useEffect, useState } from "react";
import { fetchLoggedUser, updateLoggedUser } from "../../services/LoggedUser";

export default function LoggedUserInfo() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePictureUrl: "",
  });
  const [status, setStatus] = useState({ loading: false, success: null, error: null });

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchLoggedUser();
        setUser(data);
        setFormData({
          name: data.name || "",
          email: data.email || "",
          phoneNumber: data.phoneNumber || "",
          profilePictureUrl: data.profilePictureUrl || "",
        });
      } catch (err) {
        console.error("Gagal memuat user", err);
      }
    };
    loadUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null, error: null });
    try {
      await updateLoggedUser(formData);
      const updatedUser = await fetchLoggedUser();
      setUser(updatedUser);
      setIsEditing(false);
      setStatus({ loading: false, success: "Profil berhasil diperbarui!", error: null });
    } catch (err) {
      console.error(err);
      setStatus({
        loading: false,
        success: null,
        error: "Gagal memperbarui profil. Pastikan data valid.",
      });
    }
  };

  const avatarUrl = formData.profilePictureUrl?.trim()
    ? formData.profilePictureUrl
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name || "User")}&background=random`;

  if (!user) return <p className="mt-8 text-center">Memuat data pengguna...</p>;

  return (
    <div className="max-w-xl p-6 mx-auto mt-8 bg-white border border-gray-200 shadow-lg rounded-xl">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Profil Pengguna</h2>

      <div className="flex flex-col items-center gap-6 md:flex-row">
        <img
          src={avatarUrl}
          alt={formData.name}
          className="object-cover border-4 border-blue-500 rounded-full shadow w-28 h-28"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = `https://ui-avatars.com/api/?name=User&background=random`;
          }}
        />

        <div className="flex-1 w-full">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                disabled={!isEditing}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled={!isEditing}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">No HP</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                disabled={!isEditing}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">URL Foto Profil</label>
              <input
                type="text"
                name="profilePictureUrl"
                value={formData.profilePictureUrl}
                disabled={!isEditing}
                onChange={handleChange}
                className={`w-full px-3 py-2 rounded-md border ${
                  isEditing ? "bg-white border-gray-300" : "bg-gray-100 cursor-not-allowed"
                }`}
              />
            </div>

            {isEditing ? (
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setFormData({
                      name: user.name || "",
                      email: user.email || "",
                      phoneNumber: user.phoneNumber || "",
                      profilePictureUrl: user.profilePictureUrl || "",
                    });
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={status.loading}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50"
                >
                  {status.loading ? "Menyimpan..." : "Simpan"}
                </button>
              </div>
            ) : (
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
                >
                  Ubah Profil
                </button>
              </div>
            )}

            {status.error && <p className="text-sm text-red-600">{status.error}</p>}
            {status.success && <p className="text-sm text-green-600">{status.success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
}
