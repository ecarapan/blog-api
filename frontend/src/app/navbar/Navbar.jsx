import styles from "@/app/navbar/Navbar.module.css";
import { Link } from "react-router";

export function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h1>Blog</h1>
      <Link to="/login" className={styles.loginButton}>
        Login
      </Link>
    </nav>
  );
}
