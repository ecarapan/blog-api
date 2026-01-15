import { Router } from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { getPosts, getDrafts, getPost, createPost, } from "../controllers/postsController.js";
import { createPostValidationRules, validate, } from "../middleware/creatPostValidation.js";
import { commentsRouter } from "./commentsRouter.js";
export const postsRouter = Router();
postsRouter.get("/", getPosts);
postsRouter.get("/drafts", getDrafts);
postsRouter.get("/:postId", getPost);
postsRouter.use("/:postId/comments", commentsRouter);
postsRouter.post("/", verifyToken, createPostValidationRules, validate, createPost);
//# sourceMappingURL=postsRouter.js.map