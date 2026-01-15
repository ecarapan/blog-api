import { Router } from "express";
import { getComments, createComment, } from "../controllers/commentsController.js";
import { verifyToken } from "../middleware/verifyToken.js";
export const commentsRouter = Router();
commentsRouter.get("/", getComments);
commentsRouter.post("/", verifyToken, createComment);
//# sourceMappingURL=commentsRouter.js.map