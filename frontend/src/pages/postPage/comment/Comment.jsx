import styles from "@/pages/postPage/comment/Comment.module.css";
import { Link } from "react-router";
import { useFetch } from "@/hooks/useFetch";

export function Comment({ userId, content, date }) {
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch(`http://localhost:3000/users/${userId}`);

  return (
    <article className={styles.comment}>
      {userLoading && <div className={styles.loadingSpinner}></div>}
      {userError && <div className={styles.errorSpinner}>{userError}</div>}
      {user && (
        <>
          <Link to={`/users/${user.id}`} className={styles.commentToUserBtn}>
            {user.name}
          </Link>
          <p>{content}</p>
          <p>{date}</p>
        </>
      )}
    </article>
  );
}
