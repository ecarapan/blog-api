import styles from "@/pages/homePage/HomePage.module.css";
import { Post } from "@/pages/homePage/post/Post.jsx";
import { useFetch } from "@/hooks/useFetch";

const API_BASE = import.meta.env.VITE_API_BASE;

export function HomePage() {
  const {
    data: postsList,
    loading: postsLoading,
    error: postsError,
  } = useFetch(`${API_BASE}/posts`);
  const publishedPostsList = (postsList ?? []).filter(
    (post) => post?.is_posted
  );

  return (
    <div className={styles.homePage}>
      <main>
        {postsLoading && <div className={styles.loadingSpinner}></div>}
        {postsError && <h2 className={styles.errorSpinner}>{postsError}</h2>}
        {publishedPostsList &&
          publishedPostsList.map((post) => (
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
