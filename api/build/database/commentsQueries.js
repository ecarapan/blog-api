import { db } from "./setup/database.js";
export async function getCommentsQuery(postId) {
    return await db
        .selectFrom("comments")
        .selectAll()
        .where("post_id", "=", postId)
        .execute();
}
export async function createCommentQuery(postId, userId, content) {
    return await db
        .insertInto("comments")
        .values({ post_id: postId, user_id: userId, content })
        .returning(["id", "post_id", "user_id", "content"])
        .executeTakeFirst();
}
//# sourceMappingURL=commentsQueries.js.map