import styles from "@/pages/createPostPage/CreatePostPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

export function CreatePostPage() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e, isPosted) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.target);
    const title = formData.get("title");
    const content = formData.get("content");
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/posts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, isPosted }),
      });
      const data = await res.json();

      if (res.ok) {
        navigate("/");
      } else {
        setError(
          data.errors?.[0]?.msg || data.error || "Failed to create post"
        );
      }
    } catch {
      setError("Network error");
    }
  }

  return (
    <div className={styles.createPostPage}>
      <form onSubmit={(e) => handleSubmit(e, true)} className={styles.form}>
        <div>
          <label>
            Title:
            <input name="title" type="text" required />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea name="content" required />
          </label>
        </div>
        <button type="submit">Upload</button>
        <button type="button" onClick={(e) => handleSubmit(e, false)}>
          Save as Draft
        </button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}
