import styles from "@/pages/postPage/PostPage.module.css";
import { Comment } from "@/pages/postPage/comment/Comment.jsx";
import { usePostPage } from "@/pages/postPage/usePostPage";
import { useUser } from "@/hooks/useUser.js";
import { formatDate } from "@/util/formatDate";

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

  if (postError) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <h1 role="alert" aria-live="assertive" className={styles.errorSpinner}>
          {postError}
        </h1>
      </div>
    );
  }

  if (postLoading) {
    return (
      <div className={`${styles.homePage} ${styles.loading}`}>
        <div
          role="status"
          aria-live="polite"
          className={styles.loadingSpinner}
        ></div>
      </div>
    );
  }

  return (
    <div className={styles.postPage}>
      <main>
        <h1>{post.title}</h1>
        <p>{formatDate(post.date)}</p>
        <p>{user?.name}</p>
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
