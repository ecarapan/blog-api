import { pool } from "./setup/pool.js";

export async function getUserQuery(userId: number) {
  const { rows: userRows } = await pool.query(
    `SELECT * FROM users WHERE id = $1`,
    [userId],
  );
  const user = userRows[0];
  if (!user) return null;

  const { rows: posts } = await pool.query(
    `SELECT id, title, content, date FROM posts WHERE user_id = $1`,
    [userId],
  );

  return {
    ...user,
    posts,
  };
}

export async function getUserPostsQuery(userId: number) {
  const { rows } = await pool.query(`SELECT * FROM posts WHERE user_id = $1`, [
    userId,
  ]);
  return rows;
}

export async function getUserByEmailQuery(email: string) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0] || null;
}

export async function createUserQuery(
  name: string,
  email: string,
  hashedPassword: string,
) {
  const { rows } = await pool.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, name, email`,
    [name, email, hashedPassword],
  );
  return rows[0];
}
