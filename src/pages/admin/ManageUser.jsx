import React, { useEffect, useState } from "react";
import { getAllUsers, updateUserRole } from "../../services/admin/getUser";

export default function ManageUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await getAllUsers();
      const allUsers = Array.isArray(data) ? data : [data];
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (err) {
      console.error("Gagal ambil user:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingUserId(userId);
    try {
      await updateUserRole(userId, newRole);
      alert("Role berhasil diupdate");
      await fetchUsers();
    } catch (error) {
      alert("Gagal update role.");
    } finally {
      setUpdatingUserId(null);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setFilteredUsers(users);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lower = value.toLowerCase();
    const filtered = users.filter(
      (u) => u.name?.toLowerCase().includes(lower) || u.email?.toLowerCase().includes(lower)
    );

    setSuggestions(filtered.slice(0, 5)); // Max 5 suggestions
    setFilteredUsers(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (nameOrEmail) => {
    setSearchTerm(nameOrEmail);
    const filtered = users.filter((u) => u.name === nameOrEmail || u.email === nameOrEmail);
    setFilteredUsers(filtered);
    setShowSuggestions(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 to-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-6 text-2xl font-bold text-blue-700 sm:text-3xl sm:leading-tight">👥 Manajemen Pengguna</h1>

        {/* Search with suggestions */}
        <div className="relative max-w-md mb-6 sm:mb-8">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email"
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full px-3 py-2 text-sm transition duration-200 border border-gray-300 rounded-md shadow-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-40">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSuggestionClick(user.name)}
                  className="px-3 py-2 text-sm transition duration-200 cursor-pointer hover:bg-blue-50"
                >
                  {user.name} — <span className="text-xs text-gray-500">{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tabel */}
        {loading ? (
          <div className="flex items-center justify-center h-48 sm:h-64">
            <div className="w-8 h-8 border-4 border-blue-400 rounded-full sm:w-10 sm:h-10 border-t-transparent animate-spin" />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="text-lg text-center text-gray-500 sm:text-xl">Tidak ada user.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl">
            <table className="min-w-full text-sm bg-white shadow-lg sm:text-base rounded-xl">
              <thead className="text-blue-700 bg-blue-100">
                <tr>
                  <th className="p-2 text-left sm:p-3">No.</th>
                  <th className="p-2 text-left sm:p-3">Nama</th>
                  <th className="p-2 text-left sm:p-3">Email</th>
                  <th className="p-2 text-left sm:p-3">Foto</th>
                  <th className="p-2 text-left sm:p-3">Role</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {filteredUsers.map((user, i) => (
                  <tr key={user.id} className="transition duration-200 border-t hover:bg-blue-50">
                    <td className="p-2 sm:p-3">{i + 1}</td>
                    <td className="p-2 sm:p-3">{user.name}</td>
                    <td className="max-w-xs p-2 overflow-hidden sm:p-3 text-ellipsis" title={user.email}>
                      {user.email}
                    </td>
                    <td className="p-2 sm:p-3">
                      <img
                        src={user.profilePictureUrl || `https://ui-avatars.com/api/?name=${user.name}`}
                        alt={user.name}
                        className="object-cover w-8 h-8 border rounded-full sm:w-10 sm:h-10"
                      />
                    </td>
                    <td className="p-2 sm:p-3">
                      <select
                        value={user.role}
                        disabled={updatingUserId === user.id}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className="px-2 py-1 text-sm transition duration-200 border border-gray-300 rounded-md sm:px-3 sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
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
