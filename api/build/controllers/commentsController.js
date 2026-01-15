import { getCommentsQuery, createCommentQuery, } from "../database/commentsQueries.js";
import { matchedData } from "express-validator";
export async function getComments(req, res) {
    try {
        const postId = Number(req.params["postId"]);
        const comments = await getCommentsQuery(postId);
        res.json(comments);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch comments" });
    }
}
export async function createComment(req, res) {
    const { content } = matchedData(req);
    const postId = Number(req.params["postId"]);
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    try {
        const comment = await createCommentQuery(postId, userId, content);
        res.status(201).json({ message: "Comment added", comment });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to add comment" });
    }
    return;
}
//# sourceMappingURL=commentsController.js.map