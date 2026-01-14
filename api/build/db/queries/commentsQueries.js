import { pool } from "../pool.js";
export async function retrieveAllComments(postId) {
    const { rows } = await pool.query("SELECT * FROM comments WHERE post_id = $1", [postId]);
    return rows;
}
export async function createComment(postId, userId, content) {
    const { rows } = await pool.query("INSERT INTO comments (post_id, user_id, content) VALUES ($1, $2, $3) RETURNING id, post_id, user_id, content", [postId, userId, content]);
    return rows[0];
}
//# sourceMappingURL=commentsQueries.js.map