import styles from "./App.module.css";
import { Outlet } from "react-router";
import { Navbar } from "@/app/navbar/Navbar.jsx";

export function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <Outlet />
    </div>
  );
}
