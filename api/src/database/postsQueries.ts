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
  return await db
    .selectFrom("posts")
    .selectAll()
    .where("id", "=", postId)
    .executeTakeFirst();
}

export async function createPostQuery(
  title: string,
  content: string,
  isPosted: boolean,
  userId: number
) {
  return await db
    .insertInto("posts")
    .values({ title, content, is_posted: isPosted, user_id: userId });
}
