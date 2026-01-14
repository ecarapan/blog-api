import type { Request, Response } from "express";
import {
  retrieveUser,
  retrieveAllUserPosts,
} from "../database/usersQueries.js";

export async function getUser(req: Request, res: Response) {
  try {
    const userId = Number(req.params["userId"]);
    const user = await retrieveUser(userId);
    if (!user) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
  return;
}

export async function getAllUserPosts(req: Request, res: Response) {
  try {
    const userId = Number(req.params["userId"]);
    const posts = await retrieveAllUserPosts(userId);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user's posts" });
  }
  return;
}
