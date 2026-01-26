import { pool } from "./setup/pool.js";

export async function getCommentsQuery(postId: number) {
  const { rows } = await pool.query(
    `SELECT comments.id, comments.content, comments.date,
            users.id AS user_id, users.name AS user_name, users.email AS user_email
     FROM comments
     INNER JOIN users ON comments.user_id = users.id
     WHERE comments.post_id = $1
     ORDER BY comments.date DESC`,
    [postId],
  );

  return rows.map((row) => ({
    id: row.id,
    content: row.content,
    date: row.date,
    user: {
      id: row.user_id,
      name: row.user_name,
      email: row.user_email,
    },
  }));
}

export async function createCommentQuery(
  postId: number,
  userId: number,
  content: string,
) {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES ($1, $2, $3)`,
    [postId, userId, content],
  );
  return rows[0];
}
