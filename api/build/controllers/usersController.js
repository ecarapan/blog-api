import { retrieveUser, retrieveAllUserPosts, } from "../db/queries/usersQueries.js";
export async function getUser(req, res) {
    try {
        const userId = Number(req.params.userId);
        const user = await retrieveUser(userId);
        if (!user) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(user);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch posts" });
    }
}
export async function getAllUserPosts(req, res) {
    try {
        const userId = Number(req.params.userId);
        const posts = await retrieveAllUserPosts(userId);
        res.json(posts);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch user's posts" });
    }
}
//# sourceMappingURL=usersController.js.map