import type { Request, Response } from "express";
import { createUser } from "../database/usersQueries.js";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";

export async function signup(req: Request, res: Response) {
  const { name, email, password } = matchedData(req);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sign-up failed" });
  }
}
