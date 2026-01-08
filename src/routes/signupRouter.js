import { Router } from "express";
import { signup } from "../controllers/signupController.js";

export const signupRouter = Router();

signupRouter.post("/", signup);
