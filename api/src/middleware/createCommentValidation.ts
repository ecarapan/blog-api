import type { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export const createCommentValidationRules = [
  body("content").isString().trim().notEmpty().withMessage("Comment required."),
];

export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
  return;
}
