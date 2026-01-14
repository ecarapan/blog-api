import { Router } from "express";
import { getUser, getAllUserPosts } from "../controllers/usersController.js";
export const usersRouter = Router();
usersRouter.get("/:userId", getUser);
usersRouter.get("/:userId/posts", getAllUserPosts);
//# sourceMappingURL=usersRouter.js.map