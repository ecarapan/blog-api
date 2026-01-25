import { pool } from "./setup/pool.js";

// Get all posted posts with comment count
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

// Get all drafts
export async function getDraftsQuery() {
  const { rows } = await pool.query(
    `SELECT * FROM posts WHERE is_posted = false`,
  );
  return rows;
}

// Get a single post with user info and comments
export async function getPostQuery(postId: number) {
  // Get the post and user info
  const { rows: postRows } = await pool.query(
    `SELECT posts.id, posts.title, posts.content, posts.date,
            users.id AS user_id, users.name AS user_name
     FROM posts
     INNER JOIN users ON posts.user_id = users.id
     WHERE posts.id = $1`,
    [postId],
  );
  const post = postRows[0];
  if (!post) return null;

  // Get comments with user info
  const { rows: comments } = await pool.query(
    `SELECT comments.id, comments.content, comments.date,
            users.id AS user_id, users.name AS user_name
     FROM comments
     INNER JOIN users ON comments.user_id = users.id
     WHERE comments.post_id = $1
     ORDER BY comments.date ASC`,
    [postId],
  );

  return {
    id: post.id,
    title: post.title,
    content: post.content,
    date: post.date,
    user: {
      id: post.user_id,
      name: post.user_name,
    },
    comments: comments.map((c) => ({
      id: c.id,
      content: c.content,
      date: c.date,
      user: {
        id: c.user_id,
        name: c.user_name,
      },
    })),
  };
}

// Create a post and return the inserted row
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
