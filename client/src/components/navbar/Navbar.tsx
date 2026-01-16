import styles from "@/components/navbar/Navbar.module.css";
import { Link, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";
import plusIcon from "@/assets/plus-circle-outline.svg";
import logoutIcon from "@/assets/logout-variant.svg";
import profileIcon from "@/assets/file-account-outline.svg";
import menuIcon from "@/assets/menu.svg";

type NavbarProps = {
  onSidebarToggle: () => void;
};

export function Navbar({ onSidebarToggle }: NavbarProps) {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleUserMenu() {
    setUserMenuOpen(!userMenuOpen);
  }

  function getUserFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch {
      return null;
    }
  }

  function handleUserProfile() {
    setUserMenuOpen(false);
    const userId = getUserFromToken().id;
    if (userId) {
      navigate(`/users/${userId}`);
    }
  }

  function getUserInitial() {
    const user = getUserFromToken();
    const userInitial = user.name[0].toUpperCase();
    return userInitial;
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.menu}>
        <button onClick={onSidebarToggle}>
          <img src={menuIcon} />
        </button>
        <Link to="/" className={styles.navbarTitle}>
          Forum
        </Link>
      </div>
      {isLoggedIn && (
        <div className={styles.actions}>
          <Link to={"/create"} className={styles.createPostBtn}>
            <img src={plusIcon} />
            Create Post
          </Link>
          <div ref={menuRef} className={styles.menuWrapper}>
            <button onClick={handleUserMenu} className={styles.dropDownBtn}>
              {getUserInitial()}
            </button>
            <div
              className={`${styles.userMenu} ${userMenuOpen ? styles.open : ""}`}
            >
              <button onClick={handleUserProfile}>
                <img src={profileIcon} />
                Profile
              </button>
              <button onClick={handleLogout}>
                <img src={logoutIcon} />
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <Link to="/login" className={styles.loginButton}>
          Log In
        </Link>
      )}
    </nav>
  );
}
