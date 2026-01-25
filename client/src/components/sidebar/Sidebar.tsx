import styles from "@/components/sidebar/Sidebar.module.css";
import { Link, useLocation } from "react-router";
import homeIcon from "@/assets/home-variant-outline.svg";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <ul>
        <li>
          <Link
            to="/"
            className={`${styles.link} ${location.pathname === "/" ? styles.selected : ""}`}
          >
            <img src={homeIcon} />
            Home
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.link}>
            <img src={homeIcon} />
            Messages
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.link}>
            <img src={homeIcon} />
            Popular
          </Link>
        </li>
        <li>
          <Link to="/" className={styles.link}>
            <img src={homeIcon} />
            Oldest
          </Link>
        </li>
      </ul>
    </aside>
  );
}
