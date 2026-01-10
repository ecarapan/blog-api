import styles from "@/pages/homePage/post/Post.module.css";
import { Link } from "react-router";

export function Post({ id, title, content }) {
  return (
    <article className={styles.post}>
      <div className={styles.info}>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
      <Link to={`/posts/${id}`} className={styles.navPostButton}>
        Read more
      </Link>
    </article>
  );
}
