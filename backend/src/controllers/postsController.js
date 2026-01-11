import {
  retrieveAllPosts,
  retrievePost,
  createPost,
} from "../db/queries/postsQueries.js";
import {
  retrieveAllComments,
  createComment,
} from "../db/queries/commentsQueries.js";

export async function getAllPosts(req, res) {
  try {
    const posts = await retrieveAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getPost(req, res) {
  try {
    const postId = Number(req.params.postId);
    const post = await retrievePost(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

export async function addPost(req, res) {
  const { title, content } = req.body;
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const post = await createPost(title, content, userId);
    res.status(201).json({ message: "Post created", post });
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function getAllComments(req, res) {
  try {
    const postId = Number(req.params.postId);
    const comments = await retrieveAllComments(postId);
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

export async function addComment(req, res) {
  const { content } = req.body;
  const postId = Number(req.params.postId);
  const userId = req.user.id;
  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const comment = await createComment(postId, userId, content);
    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
}
