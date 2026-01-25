import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const createPostValidationRules = [
  body("title")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Title required.")
    .isLength({ max: 200 })
    .withMessage("Title must be at most 300 characters."),
  body("content")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Post body required."),
  body("isPosted").isBoolean().optional(),
];

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
}
