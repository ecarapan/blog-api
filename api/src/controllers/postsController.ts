import type { Request, Response } from "express";
import {
  getPostsQuery,
  getDraftsQuery,
  getPostQuery,
  createPostQuery,
} from "../database/postsQueries.js";
import { matchedData } from "express-validator";

export async function getPosts(_req: Request, res: Response) {
  try {
    const posts = await getPostsQuery();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getDrafts(_req: Request, res: Response) {
  try {
    const posts = await getDraftsQuery();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const postId = Number(req.params["postId"]);
    const post = await getPostQuery(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
  return;
}

export async function createPost(req: Request, res: Response) {
  const { title, content, isPosted } = matchedData(req);
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const post = await createPostQuery(title, content, isPosted, userId);
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
  return;
}
