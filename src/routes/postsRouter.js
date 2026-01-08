import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllPosts,
  getPost,
  addPost,
} from "../controllers/postsController.js";

export const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:postId", getPost);
postsRouter.post("/", verifyToken, addPost);
