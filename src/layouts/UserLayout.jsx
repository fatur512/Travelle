import NavbarUser from "../components/NavbarUser";

export default function UserLayout({ children }) {
  return (
    <>
      <NavbarUser />
      <main>{children}</main>
    </>
  );
}
