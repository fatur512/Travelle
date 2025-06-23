import React, { useEffect, useState } from "react";
import { fetchLoggedUser } from "../../services/LoggedUser";

export default function LoggedUserInfo() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchLoggedUser();
        setUser(data);
      } catch (err) {
        setError("Gagal memuat data pengguna.");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  if (loading) return <p className="mt-6 text-center text-gray-500">Memuat data pengguna...</p>;
  if (error) return <p className="mt-6 text-center text-red-500">{error}</p>;
  if (!user) return null;

  return (
    <div className="max-w-4xl p-6 mx-auto mt-8 bg-white border border-gray-200 rounded-lg shadow">
      <h2 className="pb-2 mb-6 text-2xl font-bold text-gray-800 border-b">Account Information</h2>

      <div className="flex items-start gap-6">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <img
            src={user.profilePictureUrl || `https://ui-avatars.com/api/?name=${user.name}`}
            alt={user.name}
            className="object-cover w-20 h-20 border rounded-full"
          />
        </div>

        {/* Form Info */}
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              value={user.name}
              disabled
              className="w-full p-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Email</label>
            <input
              type="text"
              value={user.email}
              disabled
              className="w-full p-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700">Role</label>
            <input
              type="text"
              value={user.role}
              disabled
              className="w-full p-2 mt-1 text-gray-700 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700">
          Ubah Profil
        </button>
      </div>
    </div>
  );
}
