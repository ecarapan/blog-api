import styles from "./App.module.css";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/app/navbar/Navbar.jsx";

export function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className={styles.app}>
      {!hideNavbar && <Navbar />}
      <Outlet />
    </div>
  );
}
