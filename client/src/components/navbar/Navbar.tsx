import styles from "@/components/navbar/Navbar.module.css";
import { Link, useNavigate } from "react-router";
import { useState, useEffect, useRef } from "react";

export function Navbar() {
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

  function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  }

  function handleUserProfile() {
    setUserMenuOpen(false);
    const userId = getUserIdFromToken();
    if (userId) {
      navigate(`/users/${userId}`);
    }
  }

  return (
    <nav className={styles.navbar}>
      <Link to="/">
        <h1>Forum</h1>
      </Link>
      {isLoggedIn && (
        <div className={styles.actions}>
          <Link to={"/create"}>Create Post</Link>
          <div ref={menuRef}>
            <button onClick={handleUserMenu} className={styles.dropDownBtn}>
              User
            </button>
            {userMenuOpen && (
              <div className={styles.userMenu}>
                <button className={styles.menuItem} onClick={handleUserProfile}>
                  Profile
                </button>
                <button className={styles.menuItem} onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <Link to="/login" className={styles.loginButton}>
          Login
        </Link>
      )}
    </nav>
  );
}
