import React from "react";
import NavbarAdmin from "../components/NavbarAdmin";

export default function AdminLayout({ children }) {
  return (
    <>
      <NavbarAdmin />
      <main>{children}</main>
    </>
  );
}
