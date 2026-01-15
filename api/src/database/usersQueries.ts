import { db } from "./setup/database.js";

export async function getUserQuery(userId: number) {
  const user = await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirst();

  if (!user) return null;

  const posts = await db
    .selectFrom("posts")
    .select(["id", "title", "content", "date"])
    .where("user_id", "=", userId)
    .execute();

  return {
    ...user,
    posts,
  };
}

export async function getUserPostsQuery(userId: number) {
  return await db
    .selectFrom("posts")
    .selectAll()
    .where("user_id", "=", userId)
    .execute();
}

export async function getUserByEmailQuery(email: string) {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
}

export async function createUserQuery(
  name: string,
  email: string,
  hashedPassword: string
) {
  return await db
    .insertInto("users")
    .values({ name, email, password: hashedPassword })
    .returning(["id", "name", "email"])
    .executeTakeFirst();
}
