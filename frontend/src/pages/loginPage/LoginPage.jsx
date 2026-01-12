import styles from "@/pages/loginPage/LoginPage.module.css";
import { Link } from "react-router";

export function LoginPage() {
  return (
    <div className={styles.loginPage}>
      <form action="http://localhost:3000/login" method="POST">
        <div>
          <label>
            Email:
            <input name="email" type="email" required />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input name="password" type="password" required />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to="/signup">Don't have an account? Sign up</Link>
    </div>
  );
}
