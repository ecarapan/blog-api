import styles from "@/pages/postPage/PostPage.module.css";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import { Comment } from "@/pages/postPage/comment/Comment.jsx";
import { useUser } from "@/hooks/useUser.js";

export function PostPage() {
  const { postId } = useParams();

  const [post, setPost] = useState(null);
  const [postLoading, setPostLoading] = useState(true);
  const [postError, setPostError] = useState(null);

  const [commentsList, setCommentsList] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [commentsError, setCommentsError] = useState(null);

  const { user } = useUser(post?.user_id);

  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await fetch(`http://localhost:3000/posts/${postId}`);
        const postData = await response.json();
        setPost(postData);
        setPostLoading(false);
      } catch (err) {
        setPostError(err.message || "Error fetching posts");
        setPostLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  useEffect(() => {
    if (!post) {
      return;
    }

    async function fetchComments() {
      try {
        const response = await fetch(
          `http://localhost:3000/posts/${post.id}/comments`
        );
        const commentsData = await response.json();
        setCommentsList(commentsData);
        setCommentsLoading(false);
      } catch (err) {
        setCommentsError(err.message || "Error fetching posts");
        setCommentsLoading(false);
      }
    }

    fetchComments();
  }, [post]);

  function formatDate(dateString) {
    const d = new Date(dateString);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

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
        <p>{user.name}</p>
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
