import { Router } from "express";
import { signup } from "../controllers/signupController.js";
import { signupValidationRules, validate, } from "../middleware/signupValidation.js";
export const signupRouter = Router();
signupRouter.post("/", signupValidationRules, validate, signup);
//# sourceMappingURL=signupRouter.js.map