import styles from "@/pages/loginPage/LoginPage.module.css";
import { Link } from "react-router";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

export function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        setError(data.errors?.[0]?.msg || data.error || "Login failed");
      }
    } catch {
      setError("Network error");
    }
  }

  return (
    <div className={styles.loginPage}>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label>
            Email
            <input
              name="email"
              type="email"
              required
              className={styles.emailInput}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <div className={styles.passwordInputWrapper}>
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </label>
        </div>
        <div className={styles.error}>{error}</div>
        <button type="submit" className={styles.submitBtn}>
          Login
        </button>
        <div className={styles.signup}>
          <p>Don&apos;t have an account?</p>
          <Link to="/signup">Sign up</Link>
        </div>
      </form>
    </div>
  );
}
