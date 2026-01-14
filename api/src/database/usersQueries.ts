import { db } from "./setup/database.js";

export async function retrieveUser(userId: number) {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("id", "=", userId)
    .executeTakeFirst();
}

export async function retrieveAllUserPosts(userId: number) {
  return await db
    .selectFrom("posts")
    .selectAll()
    .where("user_id", "=", userId)
    .execute();
}

export async function retrieveUserByEmail(email: string) {
  return await db
    .selectFrom("users")
    .selectAll()
    .where("email", "=", email)
    .executeTakeFirst();
}

export async function createUser(
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
