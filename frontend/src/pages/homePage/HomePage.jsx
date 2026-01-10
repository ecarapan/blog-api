import styles from "@/pages/homePage/HomePage.module.css";
import { Post } from "@/pages/homePage/post/Post.jsx";
import { usePosts } from "@/hooks/usePosts.js";
import { Link } from "react-router";

export function HomePage() {
  const { postsList, loading, error } = usePosts();

  if (error) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <h1 role="alert" aria-live="assertive" className={styles.errorSpinner}>
          {error}
        </h1>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <div
          role="status"
          aria-live="polite"
          className={styles.loadingSpinner}
        ></div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <nav>
        <h1>Blog</h1>
        <Link to="/login" className={styles.loginButton}>
          Login
        </Link>
      </nav>
      <main>
        {postsList.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
          />
        ))}
      </main>
    </div>
  );
}
