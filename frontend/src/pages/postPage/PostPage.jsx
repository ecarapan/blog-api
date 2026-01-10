import styles from "@/pages/postPage/PostPage.module.css";
import { usePosts } from "@/hooks/usePosts";
import { useParams } from "react-router";

export function PostPage() {
  const { postsList, loading, error } = usePosts();
  const { postId } = useParams();
  const post = postsList.find((p) => p.id == postId);
  const { title, content, date } = post || {};

  function formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  return (
    <div className={styles.postPage}>
      <h2>{title}</h2>
      <p>{formatDate(date)}</p>
      <p>{content}</p>
    </div>
  );
}
