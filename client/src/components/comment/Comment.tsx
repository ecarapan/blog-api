import styles from "@/components/comment/Comment.module.css";
import { Link } from "react-router";
import { formatDate } from "@/util/formatDate";
import commentIcon from "@/assets/comment-outline.svg";

interface CommentProps {
  userId: number;
  name: string;
  email: string;
  content: string;
  date: string;
}

export function Comment({ userId, name, email, content, date }: CommentProps) {
  return (
    <article className={styles.comment}>
      <Link to={`/users/${userId}`} className={styles.commentToUserBtn}>
        <div className={styles.userIcon}>{name[0].toUpperCase()}</div>
        <div>
          <p>
            {name} ({email})
          </p>
          <p>{formatDate(date)}</p>
        </div>
      </Link>
      <div className={styles.content}>
        <p>{content}</p>
        <div className={styles.actions}>
          <button className={styles.commentsBtn}>
            <img src={commentIcon} />
            Reply
          </button>
        </div>
      </div>
    </article>
  );
}
