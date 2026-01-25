import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { getUserByEmailQuery } from "../database/usersQueries.js";

export const signupValidationRules = [
  body("name").trim().isLength({ min: 1 }).withMessage("Name is required."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Email must be valid.")
    .custom(async (email) => {
      const user = await getUserByEmailQuery(email);
      if (user) {
        throw new Error("A user with that email already exists.");
      }
    }),
  body("password")
    .isString()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number.")
    .not()
    .matches(/\s/)
    .withMessage("Password must not contain spaces."),
  body("confirmPassword")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Passwords do not match."),
];

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
}
