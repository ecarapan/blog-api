import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  getAllPosts,
  getPost,
  addPost,
  getAllComments,
  addComment,
} from "../controllers/postsController.js";
import {
  createPostValidationRules,
  validate,
} from "../middleware/creatPostValidation.js";

export const postsRouter = Router();

postsRouter.get("/", getAllPosts);
postsRouter.get("/:postId", getPost);
postsRouter.post("/", verifyToken, addPost);

postsRouter.get("/:postId/comments", getAllComments);
postsRouter.post(
  "/:postId/comments",
  verifyToken,
  createPostValidationRules,
  validate,
  addComment
);
