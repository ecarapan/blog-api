import styles from "@/pages/createPostPage/CreatePostPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";

const API_BASE = import.meta.env.VITE_API_BASE;

export function CreatePostPage() {
  const [error, setError] = useState("");
  const [action, setAction] = useState<"upload" | "draft" | null>(null);
  const navigate = useNavigate();
  const [titleCount, setTitleCount] = useState(0);
  const titleLength = 200;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    const isPosted = action === "upload";
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
          data.errors?.[0]?.msg || data.error || "Failed to create post",
        );
      }
    } catch {
      setError("Network error");
    }
  }

  return (
    <div className={styles.createPostPage}>
      <form onSubmit={handleSubmit}>
        <h1>Create post</h1>
        <label>
          Title
          <textarea
            name="title"
            maxLength={titleLength}
            onChange={(e) => setTitleCount(e.target.value.length)}
            rows={1}
            className={styles.titleTextarea}
          />
          <p className={styles.titleCount}>
            {titleCount}/{titleLength}
          </p>
        </label>
        <label>
          Content
          <textarea
            name="content"
            rows={4}
            className={styles.contentTextarea}
          ></textarea>
        </label>
        <div className={styles.info}>
          <div className={styles.error}>{error}</div>
          <div className={styles.actions}>
            <button type="submit" onClick={() => setAction("draft")}>
              Save as Draft
            </button>
            <button type="submit" onClick={() => setAction("upload")}>
              Post
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
