import styles from "./App.module.css";
import { Outlet } from "react-router";

export function App() {
  return (
    <div className={styles.app}>
      <Outlet />
    </div>
  );
}
