import styles from "@/pages/userPage/UserPage.module.css";
import { useParams } from "react-router";
import { Post } from "@/pages/homePage/post/Post.jsx";
import { useFetch } from "@/hooks/useFetch";

const API_BASE = import.meta.env.VITE_API_BASE;

export function UserPage() {
  const { userId } = useParams();
  const {
    data: userPostsList,
    loading: userPostsLoading,
    error: userPostsError,
  } = useFetch(`${API_BASE}/users/${userId}/posts`);
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch(`${API_BASE}/users/${userId}`);

  return (
    <div className={styles.userPage}>
      {(userLoading || userPostsLoading) && (
        <div className={styles.loadingSpinner}></div>
      )}
      {(userError || userPostsError) && (
        <h2 className={styles.errorSpinner}>{userError || userPostsError}</h2>
      )}
      {user && (
        <>
          <h1>Profile</h1>
          <p>{user.name}</p>
          <p>{user.email}</p>
        </>
      )}
      {userPostsList &&
        userPostsList.map((post) => (
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
