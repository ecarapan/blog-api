import { retrieveAllPosts, retrievePost, createPost } from "../db/queries.js";

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
  const userId = req.user.id; // From JWT payload
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
