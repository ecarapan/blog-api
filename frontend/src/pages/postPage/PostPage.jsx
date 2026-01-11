import styles from "@/pages/postPage/PostPage.module.css";
import { Comment } from "@/pages/postPage/comment/Comment.jsx";
import { usePostPage } from "@/pages/postPage/usePostPage";
import { useUser } from "@/hooks/useUser.js";
import { formatDate } from "@/util/formatDate";
import { Link } from "react-router";

export function PostPage() {
  const {
    post,
    postLoading,
    postError,
    commentsList,
    commentsLoading,
    commentsError,
  } = usePostPage();
  const { user } = useUser(post?.user_id);

  if (postError || commentsError) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <h1 role="alert" aria-live="assertive" className={styles.errorSpinner}>
          {postError || commentsError}
        </h1>
      </div>
    );
  }

  if (postLoading || commentsLoading) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <div role="status" aria-live="polite" className={styles.loadingSpinner}>
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className={styles.postPage}>
      <main>
        <h1>{post.title}</h1>
        <p>{formatDate(post.date)}</p>
        <Link to={`/users/${user?.id}`} className={styles.postToUserBtn}>
          {user?.name}
        </Link>
        <p>{post.content}</p>
      </main>
      <section aria-label="Comments">
        <h2>Comments</h2>
        {commentsList.map((comment) => (
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
