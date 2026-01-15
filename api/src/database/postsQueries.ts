import { db } from "./setup/database.js";

export async function getPostsQuery() {
  return await db
    .selectFrom("posts")
    .selectAll()
    .where("is_posted", "=", true)
    .execute();
}

export async function getDraftsQuery() {
  return await db
    .selectFrom("posts")
    .selectAll()
    .where("is_posted", "=", false)
    .execute();
}

export async function getPostQuery(postId: number) {
  const post = await db
    .selectFrom("posts")
    .innerJoin("users", "posts.user_id", "users.id")
    .select([
      "posts.id as id",
      "posts.title as title",
      "posts.content as content",
      "posts.date as date",
      "users.id as user_id",
      "users.name as user_name",
    ])
    .where("posts.id", "=", postId)
    .executeTakeFirst();

  if (!post) return null;

  const comments = await db
    .selectFrom("comments")
    .innerJoin("users", "comments.user_id", "users.id")
    .select([
      "comments.id as id",
      "comments.content as content",
      "comments.date as date",
      "users.id as user_id",
      "users.name as user_name",
    ])
    .where("comments.post_id", "=", postId)
    .execute();

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

export async function createPostQuery(
  title: string,
  content: string,
  isPosted: boolean,
  userId: number
) {
  return await db
    .insertInto("posts")
    .values({ title, content, is_posted: isPosted, user_id: userId })
    .returningAll() // optional: returns the inserted row
    .executeTakeFirst(); // <-- THIS RUNS THE QUERY!
}
