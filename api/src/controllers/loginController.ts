import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { getUserByEmailQuery } from "../database/usersQueries.js";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";

export async function login(req: Request, res: Response) {
  const { email, password } = matchedData(req);
  try {
    const user = await getUserByEmailQuery(email);
    if (!user) {
      return res.status(401).json({ error: "No user with that email" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    const jwtSecret = process.env["JWT_SECRET"];
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email },
      jwtSecret,
      { expiresIn: "30d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Login failed" });
  }
  return;
}
