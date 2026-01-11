import styles from "@/pages/userPage/UserPage.module.css";
import { useUser } from "@/hooks/useUser";
import { useParams } from "react-router";
import { usePosts } from "@/hooks/usePosts";
import { Post } from "@/pages/homePage/post/Post.jsx";
import { useState, useEffect } from "react";

export function UserPage() {
  const { userId } = useParams();
  const { user, userLoading, userError } = useUser(userId);

  const [userPostsList, setUserPostsList] = useState([]);
  const [userPostsLoading, setUserPostsLoading] = useState(true);
  const [userPostsError, setUserPostsError] = useState(null);

  useEffect(() => {
    async function fetchUserPosts() {
      try {
        const response = await fetch(
          `http://localhost:3000/users/${userId}/posts`
        );
        const userPostsData = await response.json();
        setUserPostsList(userPostsData);
        setUserPostsLoading(false);
      } catch (err) {
        setUserPostsError(err.message || "Error fetching posts");
        setUserPostsLoading(false);
      }
    }

    fetchUserPosts();
  }, [userId]);

  if (userError || userPostsError) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <h1 role="alert" aria-live="assertive" className={styles.errorSpinner}>
          {userError || userPostsError}
        </h1>
      </div>
    );
  }

  if (userLoading || userPostsLoading) {
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
      {userPostsList.map((post) => (
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
