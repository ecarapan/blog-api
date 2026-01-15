import styles from "@/pages/postPage/PostPage.module.css";
import { Comment } from "@/pages/postPage/comment/Comment.jsx";
import { formatDate } from "@/util/formatDate";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useFetch } from "@/hooks/useFetch";
import type { Post } from "@/types/post";

const API_BASE = import.meta.env.VITE_API_BASE;

export function PostPage() {
  const { postId } = useParams();
  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch<Post>(`${API_BASE}/posts/${postId}`);

  return (
    <div className={styles.postPage}>
      {postLoading && <div className={styles.loadingSpinner}></div>}
      {postError && <h2 className={styles.errorSpinner}>{postError}</h2>}
      {post && (
        <>
          <main>
            <h1>{post.title}</h1>
            <p>{formatDate(post.date)}</p>
            <Link
              to={`/users/${post.user.id}`}
              className={styles.postToUserBtn}
            >
              {post.user.name}
            </Link>
            <p>{post.content}</p>
          </main>
          <section>
            <h2>Comments</h2>
            {post.comments.map((comment) => (
              <Comment
                key={comment.id}
                userId={comment.user.id}
                content={comment.content}
                date={comment.date}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
