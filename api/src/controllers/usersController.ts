import type { Request, Response } from "express";
import { getUserQuery, getUserPostsQuery } from "../database/usersQueries.js";

export async function getUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params["userId"]);
    const user = await getUserQuery(userId);

    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }

  return;
}

export async function getUserPosts(req: Request, res: Response) {
  try {
    const userId = Number(req.params["userId"]);
    const posts = await getUserPostsQuery(userId);
    res.json(posts);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch user's posts" });
  }

  return;
}
