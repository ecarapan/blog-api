import styles from "@/pages/signupPage/SignupPage.module.css";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

export function SignupPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/login");
      } else {
        setError(data.errors?.[0]?.msg || data.error || "Signup failed");
      }
    } catch {
      setError("Network error");
    }
  }

  return (
    <div className={styles.signupPage}>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input name="name" type="text" required />
          </label>
        </div>
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
        <button type="submit">Sign up</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
