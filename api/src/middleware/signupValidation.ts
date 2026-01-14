import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const signupValidationRules = [
  body("name")
    .trim()
    .escape()
    .isLength({ min: 1 })
    .withMessage("Name is required."),
  body("email").trim().escape().isEmail().withMessage("Email must be valid."),
  body("password")
    .isString()
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter.")
    .matches(/\d/)
    .withMessage("Password must contain at least one number."),
];

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
}
