import type { Request, Response } from "express";
import {
  retrieveAllPosts,
  retrievePost,
  createPost,
} from "../database/postsQueries.js";
import {
  retrieveAllComments,
  createComment,
} from "../database/commentsQueries.js";
import { matchedData } from "express-validator";

export async function getAllPosts(_req: Request, res: Response) {
  try {
    const posts = await retrieveAllPosts();
    res.json(posts);
  } catch (err) {
    console.error("Error in getAllPosts:", err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getPost(req: Request, res: Response) {
  try {
    const postId = Number(req.params["postId"]);
    const post = await retrievePost(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
  return;
}

export async function addPost(req: Request, res: Response) {
  const { title, content, isPosted } = req.body;
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const post = await createPost(title, content, isPosted, userId);
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
  return;
}

export async function getAllComments(req: Request, res: Response) {
  try {
    const postId = Number(req.params["postId"]);
    const comments = await retrieveAllComments(postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

export async function addComment(req: Request, res: Response) {
  const { content } = matchedData(req);
  const postId = Number(req.params["postId"]);
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const comment = await createComment(postId, userId, content);
    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
  return;
}
