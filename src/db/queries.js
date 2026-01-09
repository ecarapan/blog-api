import { pool } from "./pool.js";

export async function retrieveUser(userId) {
  const { rows } = await pool.query("SELECT * FROM users");
  return rows;
}

export async function retrieveUserByEmail(email) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
}

export async function createUser(name, email, hashedPassword) {
  const { rows } = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );
  return rows[0];
}

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
    "INSERT INTO posts (title, content, author_id) VALUES ($1, $2, $3) RETURNING id, title, content, author_id",
    [title, content, userId]
  );
  return rows[0];
}

export async function retrieveAllComments(postId) {
  const { rows } = await pool.query(
    "SELECT * FROM comments WHERE post_id = $1",
    [postId]
  );
  return rows;
}

export async function createComment(postId, userId, content) {
  const { rows } = await pool.query(
    "INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING id, post_id, user_id, content",
    [postId, userId, content]
  );
  return rows[0];
}
