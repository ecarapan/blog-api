import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getUserByEmailQuery } from "../database/usersQueries.js";

export const loginValidationRules = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid.")
    .custom(async (email) => {
      const user = await getUserByEmailQuery(email);
      if (!user) {
        throw new Error("No user with that email exists.");
      }
      return true;
    }),
  body("password")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Password is required."),
];

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
}
