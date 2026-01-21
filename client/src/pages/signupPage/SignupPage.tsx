import styles from "@/pages/signupPage/SignupPage.module.css";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

export function SignupPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      const res = await fetch(`${API_BASE}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, confirmPassword }),
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
        <div className={styles.info}>
          <h1>Welcome!</h1>
          <p>Please create your account.</p>
        </div>
        <label>
          Name
          <input name="name" type="text" required className={styles.input} />
        </label>
        <label>
          Email
          <input name="email" type="email" required className={styles.input} />
        </label>
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
        <label>
          Confirm Password
          <div className={styles.passwordInputWrapper}>
            <input
              name="confirmPassword"
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
        <div className={styles.error}>{error}</div>
        <button type="submit" className={styles.submitBtn}>
          Sign up
        </button>
        <div className={styles.login}>
          <p>Already have an account?</p>
          <Link to="/login">Log In</Link>
        </div>
      </form>
    </div>
  );
}
