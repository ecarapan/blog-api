import { pool } from "./setup/pool.js";

export async function getCommentsQuery(postId: number) {
  const { rows } = await pool.query(
    `SELECT id, post_id, user_id, content, date
     FROM comments
     WHERE post_id = $1
     ORDER BY date ASC`,
    [postId],
  );
  return rows;
}

export async function createCommentQuery(
  postId: number,
  userId: number,
  content: string,
) {
  const { rows } = await pool.query(
    `INSERT INTO comments (post_id, user_id, content)
     VALUES ($1, $2, $3)
     RETURNING id, post_id, user_id, content, date`,
    [postId, userId, content],
  );
  return rows[0];
}
