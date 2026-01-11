import styles from "@/pages/userPage/UserPage.module.css";
import { useUser } from "@/hooks/useUser";
import { useParams } from "react-router";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/pages/homePage/post/Post.jsx";

export function UserPage() {
  const { userId } = useParams();
  const { user, userLoading, userError } = useUser(userId);
  const { postsList, loading, error } = usePosts();

  if (userError || error) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <h1 role="alert" aria-live="assertive" className={styles.errorSpinner}>
          {userError || error}
        </h1>
      </div>
    );
  }

  if (userLoading || loading) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <div role="status" aria-live="polite" className={styles.loadingSpinner}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.userPage}>
      <h1>Profile</h1>
      <p>{user.name}</p>
      <p>{user.email}</p>
      {postsList.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
        />
      ))}
    </div>
  );
}
