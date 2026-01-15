import { getUserQuery, getUserPostsQuery } from "../database/usersQueries.js";
export async function getUser(req, res) {
    try {
        const userId = Number(req.params["userId"]);
        const user = await getUserQuery(userId);
        if (!user) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.json(user);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
    return;
}
export async function getUserPosts(req, res) {
    try {
        const userId = Number(req.params["userId"]);
        const posts = await getUserPostsQuery(userId);
        res.json(posts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: "Failed to fetch user's posts" });
    }
    return;
}
//# sourceMappingURL=usersController.js.map