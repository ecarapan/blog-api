import styles from "@/pages/postPage/PostPage.module.css";
import { formatDate } from "@/util/formatDate";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useFetch } from "@/hooks/useFetch";
import type { User } from "@/pages/userPage/UserPage.tsx";
import { Comment } from "../../components/comment/Comment";
import commentIcon from "@/assets/comment-outline.svg";
import { useState, useRef, useEffect } from "react";

const API_BASE = import.meta.env.VITE_API_BASE;

export type Post = {
  id: number;
  title: string;
  content: string;
  date: string;
  user: User;
  comments_count: number;
  comments: Comment[];
};

export type Comment = {
  id: number;
  post_id: number;
  user_id: number;
  content: string;
  date: string;
  user: User;
};

export function PostPage() {
  const { postId } = useParams();
  const [version, setVersion] = useState(false);
  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch<Post>(`${API_BASE}/posts/${postId}?v=${version}`);
  const [showCommentField, setShowCommentField] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (showCommentField && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showCommentField]);

  async function handleCommentSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const formData = new FormData(e.currentTarget);
    const content = formData.get("content");
    const token = localStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to create a post.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content }),
      });
      const data = await res.json();

      if (res.ok) {
        setVersion(!version);
        setShowCommentField(false);
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
    <div className={styles.postPage}>
      {postLoading && <div className={styles.loadingSpinner}></div>}
      {postError && <h2 className={styles.errorSpinner}>{postError}</h2>}
      {post && (
        <div className={styles.contentWrapper}>
          <main>
            <Link
              to={`/users/${post.user.id}`}
              className={styles.postToUserBtn}
            >
              <div className={styles.userIcon}>
                {post.user.name[0].toUpperCase()}
              </div>
              <div>
                <p>
                  {post.user.name} ({post.user.email})
                </p>
                <p>{formatDate(post.date)}</p>
              </div>
            </Link>
            <h1>{post.title}</h1>
            <p className={styles.postContent}>{post.content}</p>
            <div className={styles.actions}>
              <button
                className={styles.commentsBtn}
                onClick={() => setShowCommentField(!showCommentField)}
              >
                <img src={commentIcon} />
                {post.comments_count}
              </button>
            </div>
          </main>
          {(post.comments.length > 0 || showCommentField) && (
            <section>
              <h2>Comments</h2>
              {showCommentField && (
                <form
                  className={styles.addCommentDiv}
                  onSubmit={handleCommentSubmit}
                >
                  <textarea
                    name="content"
                    className={styles.commentTextarea}
                    ref={textareaRef}
                  ></textarea>
                  <div className={styles.info}>
                    <div className={styles.error}>{error}</div>
                    <div className={styles.commentActions}>
                      <button
                        type="button"
                        onClick={() => setShowCommentField(false)}
                      >
                        Cancel
                      </button>
                      <button type="submit">Comment</button>
                    </div>
                  </div>
                </form>
              )}
              {post.comments.map((comment) => (
                <Comment
                  key={comment.id}
                  userId={comment.user.id}
                  name={comment.user.name}
                  email={comment.user.email}
                  content={comment.content}
                  date={comment.date}
                />
              ))}
            </section>
          )}
        </div>
      )}
    </div>
  );
}
