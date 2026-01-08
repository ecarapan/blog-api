import { createUser } from "../db/queries.js";
import bcrypt from "bcryptjs";

export async function signup(req, res) {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createUser(name, email, hashedPassword);
    res.status(201).json({ message: "User created", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Sign-up failed" });
  }
}
