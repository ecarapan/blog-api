import styles from "@/components/sidebar/Sidebar.module.css";
import { Link } from "react-router";
import homeIcon from "@/assets/home-variant-outline.svg";

export function Sidebar({ isOpen }: { isOpen: boolean }) {
  return (
    <aside className={`${styles.sidebar} ${!isOpen ? styles.closed : ""}`}>
      <ul>
        <li>
          <img src={homeIcon} />
          <Link to="/" className={styles.homeLink}>
            Home
          </Link>
        </li>
        <li>
          <img src={homeIcon} />
          <Link to="/" className={styles.homeLink}>
            Messages
          </Link>
        </li>
        <li>
          <img src={homeIcon} />
          <Link to="/" className={styles.homeLink}>
            Popular
          </Link>
        </li>
        <li>
          <img src={homeIcon} />
          <Link to="/" className={styles.homeLink}>
            Oldest
          </Link>
        </li>
      </ul>
    </aside>
  );
}
