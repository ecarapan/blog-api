import { pool } from "./setup/pool.js";
import { getCommentsQuery } from "./commentsQueries.js";

export async function getPostsQuery() {
  const { rows } = await pool.query(
    `SELECT posts.id, posts.title, posts.content, COUNT(comments.id) AS comments_count
     FROM posts
     LEFT JOIN comments ON posts.id = comments.post_id
     WHERE posts.is_posted = true
     GROUP BY posts.id
     ORDER BY posts.id DESC`,
  );
  return rows;
}

export async function getDraftsQuery() {
  const { rows } = await pool.query(
    `SELECT * FROM posts WHERE is_posted = false`,
  );
  return rows;
}

export async function getPostQuery(postId: number) {
  const { rows: postRows } = await pool.query(
    `SELECT posts.id, posts.title, posts.content, posts.date,
            users.id AS user_id, users.name AS user_name, users.email as user_email,
            (SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comments_count
     FROM posts
     INNER JOIN users ON posts.user_id = users.id
     WHERE posts.id = $1`,
    [postId],
  );
  const post = postRows[0];
  if (!post) return null;

  const comments = await getCommentsQuery(postId);

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    date: post.date,
    user: {
      id: post.user_id,
      name: post.user_name,
      email: post.user_email,
    },
    comments_count: post.comments_count,
    comments,
  };
}

export async function createPostQuery(
  title: string,
  content: string,
  isPosted: boolean,
  userId: number,
) {
  const { rows } = await pool.query(
    `INSERT INTO posts (title, content, is_posted, user_id)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [title, content, isPosted, userId],
  );
  return rows[0];
}
