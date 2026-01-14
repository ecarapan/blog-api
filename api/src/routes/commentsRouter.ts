import { Router } from "express";
import {
  getComments,
  createComment,
} from "../controllers/commentsController.js";
import { verifyToken } from "../middleware/verifyToken.js";

export const commentsRouter = Router();

commentsRouter.get("/posts/:postId/comments", getComments);
commentsRouter.post("/posts/:postId/comments", verifyToken, createComment);
