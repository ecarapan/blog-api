import { pool } from "../pool.js";

export async function retrieveUser(userId: number) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  return rows[0];
}

export async function retrieveAllUserPosts(userId: number) {
  const { rows } = await pool.query("SELECT * FROM posts WHERE user_id = $1", [
    userId,
  ]);
  return rows;
}

export async function retrieveUserByEmail(email: string) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  return rows[0];
}

export async function createUser(
  name: string,
  email: string,
  hashedPassword: string
) {
  const { rows } = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );
  return rows[0];
}
