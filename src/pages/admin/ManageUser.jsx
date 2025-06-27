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
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllUsers();
      const allUsers = Array.isArray(data) ? data : [];
      setUsers(allUsers);
      setFilteredUsers(allUsers);
    } catch (err) {
      console.error("Failed to fetch users:", err);
      setError("Failed to load user data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    setUpdatingUserId(userId);
    try {
      await updateUserRole(userId, newRole);
      alert("User role updated successfully!");
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
      setFilteredUsers(users);
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lowerCaseValue = value.toLowerCase();
    const currentFiltered = users.filter(
      (u) => u.name?.toLowerCase().includes(lowerCaseValue) || u.email?.toLowerCase().includes(lowerCaseValue)
    );

    setSuggestions(currentFiltered.slice(0, 5));
    setFilteredUsers(currentFiltered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (nameOrEmail) => {
    setSearchTerm(nameOrEmail);
    const selectedUser = users.find((u) => u.name === nameOrEmail || u.email === nameOrEmail);
    if (selectedUser) {
      setFilteredUsers([selectedUser]);
    }
    setShowSuggestions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".search-container") === null && showSuggestions) {
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
  }, []);

  function isValidImageUrl(url) {
    try {
      const parsed = new URL(url);
      return (
        (parsed.protocol === "http:" || parsed.protocol === "https:") &&
        !parsed.hostname.includes("via.placeholder.com")
      );
    } catch {
      return false;
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800 sm:text-4xl">👥 Manajemen Pengguna</h1>

        <div className="relative max-w-md mb-8 search-container">
          <input
            type="text"
            placeholder="Cari berdasarkan nama atau email..."
            value={searchTerm}
            onChange={handleInputChange}
            className="w-full px-4 py-2 text-base transition duration-200 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {showSuggestions && suggestions.length > 0 && (
            <ul className="absolute z-10 w-full mt-1 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg max-h-40">
              {suggestions.map((user) => (
                <li
                  key={user.id}
                  onClick={() => handleSuggestionClick(user.name || user.email)}
                  className="px-4 py-2 text-sm transition duration-200 cursor-pointer hover:bg-blue-50"
                >
                  {user.name} — <span className="text-xs text-gray-500">{user.email}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin" />
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
        ) : filteredUsers.length === 0 ? (
          <div className="flex items-center justify-center h-48 text-gray-400">
            <p className="text-lg">{searchTerm ? "No users match your search." : "No users found."}</p>
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg rounded-xl">
            <table className="min-w-full text-sm text-left table-auto">
              <thead className="text-white bg-gray-800">
                <tr>
                  <th className="px-4 py-3 sm:px-6">No.</th>
                  <th className="px-4 py-3 sm:px-6">Nama</th>
                  <th className="px-4 py-3 sm:px-6">Email</th>
                  <th className="px-4 py-3 sm:px-6">Role</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {filteredUsers.map((user, i) => (
                  <tr key={user.id} className="transition duration-200 border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-4 sm:px-6">{i + 1}</td>
                    <td className="px-4 py-4 font-medium sm:px-6">{user.name}</td>
                    <td className="max-w-xs px-4 py-4 overflow-hidden text-ellipsis sm:px-6" title={user.email}>
                      {user.email}
                    </td>

                    <td className="px-4 py-4 sm:px-6">
                      <select
                        value={user.role}
                        disabled={updatingUserId === user.id}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                        className={`px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          updatingUserId === user.id ? "bg-gray-200 cursor-not-allowed" : "bg-white border-gray-300"
                        }`}
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
