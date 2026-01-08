import { retrieveUser } from "../db/queries.js";

export async function getUser(req, res) {
  try {
    const userId = Number(req.params.userId);
    const user = await retrieveUser(userId);
    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}
