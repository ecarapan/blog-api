import { Router } from "express";
import { getUser, getUserPosts } from "../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.get("/:userId", getUser);
usersRouter.get("/:userId/posts", getUserPosts);
