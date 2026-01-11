import { Router } from "express";
import { getUser } from "../controllers/usersController.js";

export const usersRouter = Router();

usersRouter.get("/:userId", getUser);
