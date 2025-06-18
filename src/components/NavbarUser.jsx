import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

export default function NavbarUser() {
  const isLoggedIn = Cookies.get("isLoggedIn") === "true";

  return (
    <nav className="container flex items-center justify-between px-4 py-4 mx-auto">
      <h1 className="text-2xl font-bold text-gray-800">Travelle</h1>
      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="mx-2 text-blue-600 hover:underline">
              Login
            </Link>
            <Link to="/register" className="mx-2 text-blue-600 hover:underline">
              Register
            </Link>
          </>
        ) : (
          <Link to="/user/profile" className="mx-2 text-blue-600 hover:underline">
            Profil
          </Link>
        )}
      </div>
    </nav>
  );
}
