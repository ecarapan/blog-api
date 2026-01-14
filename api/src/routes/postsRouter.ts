import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getPosts,
  getDrafts,
  getPost,
  createPost,
} from "../controllers/postsController.js";
import {
  createPostValidationRules,
  validate,
} from "../middleware/creatPostValidation.js";

export const postsRouter = Router();

postsRouter.get("/posts", getPosts);
postsRouter.get("/posts/:postId", getPost);
postsRouter.post(
  "/posts",
  verifyToken,
  createPostValidationRules,
  validate,
  createPost
);
postsRouter.get("posts/drafts", getDrafts);
