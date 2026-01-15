import styles from "@/pages/loginPage/LoginPage.module.css";
import { Link } from "react-router";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

export function LoginPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      {error && <div style={{ color: "red" }}>{error}</div>}
      <Link to="/signup">Sign up</Link>
    </div>
  );
}
