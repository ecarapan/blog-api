import { pool } from "../pool.js";

export async function retrieveAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

export async function retrievePost(postId: number) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [
    postId,
  ]);
  return rows[0];
}

export async function createPost(
  title: string,
  content: string,
  isPosted: boolean,
  userId: number
) {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, content, is_posted, user_id) VALUES ($1, $2, $3, $4) RETURNING id, title, content, is_posted, user_id",
    [title, content, isPosted, userId]
  );
  return rows[0];
}
