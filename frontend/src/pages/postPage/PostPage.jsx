import styles from "@/pages/postPage/PostPage.module.css";
import { Comment } from "@/pages/postPage/comment/Comment.jsx";
import { formatDate } from "@/util/formatDate";
import { Link } from "react-router";
import { useParams } from "react-router";
import { useFetch } from "@/hooks/useFetch";

export function PostPage() {
  const { postId } = useParams();
  const {
    data: post,
    loading: postLoading,
    error: postError,
  } = useFetch(postId ? `http://localhost:3000/posts/${postId}` : null);
  const {
    data: commentsList,
    loading: commentsLoading,
    error: commentsError,
  } = useFetch(
    postId ? `http://localhost:3000/posts/${postId}/comments` : null
  );
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch(post ? `http://localhost:3000/users/${post.user_id}` : null);

  return (
    <div className={styles.postPage}>
      <main>
        {(postLoading || userLoading) && (
          <div className={styles.loadingSpinner}></div>
        )}
        {postError && <h2 className={styles.errorSpinner}>{postError}</h2>}
        {userError && <h2 className={styles.errorSpinner}>{userError}</h2>}
        {post && user && (
          <>
            <h1>{post.title}</h1>
            <p>{formatDate(post.date)}</p>
            <Link to={`/users/${user.id}`} className={styles.postToUserBtn}>
              {user.name}
            </Link>
            <p>{post.content}</p>
          </>
        )}
      </main>
      <section>
        <h2>Comments</h2>
        {commentsLoading && <div className={styles.loadingSpinner}></div>}
        {commentsError && (
          <h2 className={styles.errorSpinner}>{commentsError}</h2>
        )}
        {commentsList &&
          commentsList.map((comment) => (
            <Comment
              key={comment.id}
              userId={comment.user_id}
              content={comment.content}
              date={comment.date}
            />
          ))}
      </section>
    </div>
  );
}
