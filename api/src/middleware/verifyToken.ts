import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtUser } from "../types/express.js";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(403).json({ error: "No token provided" });
  }

  const bearer = bearerHeader.split(" ");
  const token = bearer[1];

  if (!token) {
    return res.status(403).json({ error: "No token provided" });
  }

  jwt.verify(token, process.env["JWT_SECRET"] as string, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = user as JwtUser;
    next();
    return;
  });
  return;
}
