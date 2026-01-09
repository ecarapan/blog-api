import { pool } from "../pool.js";

export async function retrieveAllPosts() {
  const { rows } = await pool.query("SELECT * FROM posts");
  return rows;
}

export async function retrievePost(postId) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE id = $1", [
    postId,
  ]);
  return rows[0];
}

export async function createPost(title, content, userId) {
  const { rows } = await pool.query(
    "INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING id, title, content, user_id",
    [title, content, userId]
  );
  return rows[0];
}
