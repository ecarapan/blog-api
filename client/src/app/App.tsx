import styles from "./App.module.css";
import { Outlet, useLocation } from "react-router";
import { Navbar } from "@/components/navbar/Navbar.jsx";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { useState } from "react";

export function App() {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/signup";
  const [sidebarOpen, setSidebarOpen] = useState(true);

  function handleSidebar() {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className={styles.app}>
      {!hideNavbar && <Navbar onSidebarToggle={handleSidebar} />}
      <div className={styles.content}>
        {!hideNavbar && <Sidebar isOpen={sidebarOpen} />}
        <Outlet />
      </div>
    </div>
  );
}
