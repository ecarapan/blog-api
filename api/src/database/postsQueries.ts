import { db } from "./setup/database.js";

export async function retrieveAllPosts() {
  return await db.selectFrom("posts").selectAll().execute();
}

export async function retrievePost(postId: number) {
  return await db
    .selectFrom("posts")
    .selectAll()
    .where("id", "=", postId)
    .executeTakeFirst();
}

export async function createPost(
  title: string,
  content: string,
  isPosted: boolean,
  userId: number
) {
  return await db
    .insertInto("posts")
    .values({ title, content, is_posted: isPosted, user_id: userId })
    .returning(["id", "title", "content", "is_posted", "user_id"])
    .executeTakeFirst();
}
