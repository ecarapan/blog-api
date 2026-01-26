import styles from "@/pages/homePage/HomePage.module.css";
import { Post } from "@/components/post/Post.js";
import { useFetch } from "@/hooks/useFetch";

const API_BASE = import.meta.env.VITE_API_BASE;

export type PostType = {
  id: number;
  title: string;
  content: string;
  user_id: number;
  is_posted: boolean;
  comments_count: number;
};

export function HomePage() {
  const {
    data: postsList,
    loading: postsLoading,
    error: postsError,
  } = useFetch<PostType[]>(`${API_BASE}/posts`);

  return (
    <main className={styles.homePage}>
      {postsLoading && <div className={styles.loadingSpinner}></div>}
      {postsError && <h2 className={styles.errorSpinner}>{postsError}</h2>}
      {postsList &&
        postsList.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            commentsCount={post.comments_count}
          />
        ))}
    </main>
  );
}
