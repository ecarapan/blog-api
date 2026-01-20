import styles from "@/components/sidebar/Sidebar.module.css";
import { Link, useLocation } from "react-router";
import homeIcon from "@/assets/home-variant-outline.svg";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  const location = useLocation();

  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <ul>
        <li className={location.pathname === "/" ? styles.selected : ""}>
          <img src={homeIcon} />
          <Link to="/" className={styles.link}>
            Home
          </Link>
        </li>
        <li>
          <img src={homeIcon} />
          <Link to="/" className={styles.link}>
            Messages
          </Link>
        </li>
        <li>
          <img src={homeIcon} />
          <Link to="/" className={styles.link}>
            Popular
          </Link>
        </li>
        <li>
          <img src={homeIcon} />
          <Link to="/" className={styles.link}>
            Oldest
          </Link>
        </li>
      </ul>
    </aside>
  );
}
