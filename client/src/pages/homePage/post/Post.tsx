import styles from "@/pages/homePage/post/Post.module.css";
import { Link } from "react-router";

interface PostProps {
  id: number;
  title: string;
  content: string;
}

export function Post({ id, title, content }: PostProps) {
  return (
    <article className={styles.post}>
      <div className={styles.info}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <Link to={`/posts/${id}`} className={styles.postToPageBtn}>
        Read more
      </Link>
    </article>
  );
}
