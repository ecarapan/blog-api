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

  return (
    <article
      className={styles.post}
      onClick={() => navigate(`/posts/${id}`)}
      tabIndex={0}
      role="button"
    >
      <div className={styles.info}>
        <h2>{title}</h2>
        <p>{content}</p>
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
