import { body, validationResult } from "express-validator";

export const createPostValidationRules = [
  body("title")
    .isString()
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Title required."),
  body("content")
    .isString()
    .trim()
    .notEmpty()
    .escape()
    .withMessage("Post body required."),
];

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
}
