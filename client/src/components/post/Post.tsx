import styles from "@/components/post/Post.module.css";
import { Link } from "react-router";
import { useNavigate } from "react-router";
import commentIcon from "@/assets/comment-outline.svg";

interface PostProps {
  id: number;
  title: string;
  content: string;
  commentsCount: number;
}

export function Post({ id, title, content, commentsCount }: PostProps) {
  const navigate = useNavigate();
  const maxLength = 500;
  const preview =
    content.length > maxLength ? content.slice(0, maxLength) + "..." : content;

  return (
    <article
      className={styles.post}
      onClick={() => navigate(`/posts/${id}`)}
      tabIndex={0}
      role="button"
    >
      <div className={styles.info}>
        <h2>{title}</h2>
        <p>{preview}</p>
      </div>
      <Link
        to={`/posts/${id}`}
        className={styles.commentsBtn}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={commentIcon} />
        {commentsCount}
      </Link>
    </article>
  );
}
