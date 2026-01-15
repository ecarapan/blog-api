import styles from "@/pages/postPage/comment/Comment.module.css";
import { Link } from "react-router";
import { useFetch } from "@/hooks/useFetch";
import type { User } from "@/types/user";

const API_BASE = import.meta.env.VITE_API_BASE;

interface CommentProps {
  userId: number;
  content: string;
  date: string;
}

export function Comment({ userId, content, date }: CommentProps) {
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(`${API_BASE}/users/${userId}`);

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
