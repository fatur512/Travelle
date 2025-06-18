import React from "react";
import Banners from "./components/Banners.jsx"; // Sesuaikan path ini
import NavbarUser from "./components/NavbarUser.jsx";

export default function HomePage() {
  return (
    <div className="min-h-screen pb-10 bg-gray-100">
      <header className="py-4 bg-white shadow-md"></header>

      <main className="pt-8">
        <h2 className="mb-8 text-3xl font-extrabold text-center text-gray-900">Welcome to Your Adventure!</h2>
        {/* Di sinilah komponen Banners akan ditampilkan */}
        <Banners />

        <section className="container px-4 mx-auto mt-12 text-center">
          <p className="text-lg text-gray-700">
            Discover amazing places and share your travel experiences with the world.
          </p>
          <button className="px-6 py-3 mt-6 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg shadow-md hover:bg-blue-700">
            Start Exploring
          </button>
        </section>
      </main>

      <footer className="py-6 mt-10 text-white bg-gray-800">
        <div className="container px-4 mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Travel Journal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
