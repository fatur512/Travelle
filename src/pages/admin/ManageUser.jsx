import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../../services/admin/getUser"; // Pastikan path ini benar

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [error, setError] = useState(null); // State untuk penanganan error

  const fetchUsers = async () => {
    setLoading(true);
    setError(null); // Reset error state sebelum fetch baru
    try {
      const data = await getAllUsers();
      // Pastikan data adalah array, jika tidak, bungkus dalam array
      const allUsers = Array.isArray(data) ? data : []; // Jika bukan array, set ke array kosong
      setUsers(allUsers);
      setFilteredUsers(allUsers); // Set filteredUsers awal ke semua user
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load user data. Please try again later."); // Pesan error yang user-friendly
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingUserId(userId);
    try {
      await updateUserRole(userId, newRole);
      alert("User role updated successfully!");
      // Setelah berhasil update, ambil data terbaru untuk refresh tabel
      await fetchUsers();
    } catch (error) {
      console.error("Failed to update user role:", error);
      alert(`Failed to update user role: ${error.message || "An unknown error occurred."}`);
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim() === "") {
      setFilteredUsers(users); // Tampilkan semua user jika input kosong
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    const currentFiltered = users.filter(
      (u) => u.name?.toLowerCase().includes(lowerCaseValue) || u.email?.toLowerCase().includes(lowerCaseValue)
    );

    setSuggestions(currentFiltered.slice(0, 5)); // Batasi hingga 5 saran
    setFilteredUsers(currentFiltered); // Filter user yang ditampilkan di tabel
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (nameOrEmail) => {
    setSearchTerm(nameOrEmail);
    const selectedUser = users.find((u) => u.name === nameOrEmail || u.email === nameOrEmail);
    if (selectedUser) {
      setFilteredUsers([selectedUser]); // Hanya tampilkan user yang dipilih
    }
    setShowSuggestions(false); // Sembunyikan saran setelah klik
  };

  // Tutup saran saat klik di luar input atau saran
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        event.target.closest(".search-container") === null && // Pastikan ini elemen parent dari search input dan suggestions
        showSuggestions
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSuggestions]);

  useEffect(() => {
    fetchUsers();
  }, []); // useEffect hanya dijalankan sekali saat komponen mount

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-10">
      {/* Ubah bg-white ke bg-gray-50 untuk sedikit kontras */}
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 sm:text-4xl" role="heading" aria-level="1">
          {/* Ubah warna teks ke gray-800, tambahkan font-bold */}
          👥 Manajemen Pengguna
        </h1>

        {/* Search with suggestions */}
        <div className="relative max-w-md mb-8 search-container">
          {/* Tambah kelas search-container */}
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-base transition duration-200 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" // Sesuaikan ukuran teks, focus styling
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-40">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSuggestionClick(user.name || user.email)}
                  className="px-4 py-2 text-sm transition duration-200 cursor-pointer hover:bg-blue-50" // Ubah hover ke blue-50
                >
                  {user.name} — <span className="text-xs text-gray-500">{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Kondisional Render: Loading, Error, No Users, atau Tabel */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div
              className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin"
              role="status"
              aria-label="Loading users"
            ></div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-48 text-red-600">
            <p className="mb-2 text-lg">{error}</p>
            <button
              onClick={fetchUsers}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Coba Lagi
            </button>
          </div>
        ) : filteredUsers.length === 0 && searchTerm === "" ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <p className="text-lg">No users found.</p>
          </div>
        ) : filteredUsers.length === 0 && searchTerm !== "" ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <p className="text-lg">No users match your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
            <table className="min-w-full text-sm text-left table-auto">
              <thead className="text-white bg-gray-800">
                <tr>
                  <th className="px-4 py-3 sm:px-6">No.</th>
                  <th className="px-4 py-3 sm:px-6">Nama</th>
                  <th className="px-4 py-3 sm:px-6">Email</th>
                  <th className="px-4 py-3 sm:px-6">Foto</th>
                  <th className="px-4 py-3 sm:px-6">Role</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {filteredUsers.map((user, i) => (
                  <tr key={user.id} className="transition duration-200 border-b border-gray-200 hover:bg-gray-50">
                    {/* Border di body juga */}
                    <td className="px-4 py-4 sm:px-6">{i + 1}</td>
                    <td className="px-4 py-4 font-medium sm:px-6">{user.name}</td>
                    <td className="max-w-xs px-4 py-4 overflow-hidden text-ellipsis sm:px-6" title={user.email}>
                      {user.email}
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <img
                        src={
                          user.profilePictureUrl ||
                          `https://ui-avatars.com/api/?name=${user.name || user.email}&background=random&color=fff`
                        } // Fallback lebih baik
                        alt={user.name || "User Profile"} // Alt text lebih baik
                        className="object-cover w-10 h-10 border border-gray-200 rounded-full shadow-sm"
                      />
                    </td>
                    <td className="px-4 py-4 sm:px-6">
                      <select
                        value={user.role}
                        disabled={updatingUserId === user.id}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={`px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          updatingUserId === user.id ? "bg-gray-200 cursor-not-allowed" : "bg-white border-gray-300"
                        }`} // Styling disable
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
