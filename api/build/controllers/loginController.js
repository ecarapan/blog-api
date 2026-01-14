import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { retrieveUserByEmail } from "../db/queries/usersQueries.js";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";
export async function login(req, res) {
    const { email, password } = matchedData(req);
    try {
        const user = await retrieveUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "No user with that email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, process.env.JWT_SECRET, { expiresIn: "30d" });
        res.json({ message: "Login successful", token });
    }
    catch (err) {
        res.status(500).json({ error: "Login failed" });
    }
}
//# sourceMappingURL=loginController.js.map