import { Router } from "express";
import { login } from "../controllers/loginController.js";
import {
  loginValidationRules,
  validate,
} from "../middleware/loginValidation.js";

export const loginRouter = Router();

loginRouter.post("/login", loginValidationRules, validate, login);
