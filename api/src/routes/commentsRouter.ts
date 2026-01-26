import { Router } from "express";
import {
  getComments,
  createComment,
} from "../controllers/commentsController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import {
  createCommentValidationRules,
  validate,
} from "../middleware/createCommentValidation.js";

export const commentsRouter = Router({ mergeParams: true });

commentsRouter.get("/", getComments);

commentsRouter.post(
  "/",
  verifyToken,
  createCommentValidationRules,
  validate,
  createComment,
);
