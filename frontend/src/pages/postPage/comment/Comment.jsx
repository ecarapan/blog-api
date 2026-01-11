import styles from "@/pages/postPage/comment/Comment.module.css";
import { Link } from "react-router";
import { useUser } from "@/hooks/useUser.js";

export function Comment({ userId, content, date }) {
  const { user, userLoading, userError } = useUser(userId);

  if (userLoading) return <div>Loading user...</div>;
  if (userError) return <div>{userError}</div>;

  return (
    <article className={styles.comment}>
      <div className={styles.info}>
        <Link to={`/users/${user.id}`} className={styles.navPostButton}>
          {user.name}
        </Link>
        <p>{content}</p>
        <p>{date}</p>
      </div>
    </article>
  );
}
