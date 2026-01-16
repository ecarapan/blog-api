import styles from "@/pages/userPage/UserPage.module.css";
import { useParams } from "react-router";
import { Post } from "@/components/post/Post.js";
import { useFetch } from "@/hooks/useFetch";
import type { PostType } from "../homePage/HomePage";

const API_BASE = import.meta.env.VITE_API_BASE;

export type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  posts: PostType[];
};

export function UserPage() {
  const { userId } = useParams();
  const {
    data: user,
    loading: userLoading,
    error: userError,
  } = useFetch<User>(`${API_BASE}/users/${userId}`);

  return (
    <div className={styles.userPage}>
      {userError && <h2 className={styles.errorSpinner}>{userError}</h2>}
      {userLoading && <div className={styles.loadingSpinner}></div>}
      {user && (
        <>
          <main>
            <h1>Profile</h1>
            <p>{user.name}</p>
            <p>{user.email}</p>
          </main>
          <section>
            {user.posts.map((post) => (
              <Post
                key={post.id}
                id={post.id}
                title={post.title}
                content={post.content}
                commentsCount={post.comments_count}
              />
            ))}
          </section>
        </>
      )}
    </div>
  );
}
