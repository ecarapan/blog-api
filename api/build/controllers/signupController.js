import { createUser } from "../db/queries/usersQueries.js";
import bcrypt from "bcryptjs";
import { matchedData } from "express-validator";
export async function signup(req, res) {
    const { name, email, password } = matchedData(req);
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser(name, email, hashedPassword);
        res.status(201).json({ message: "User created", user });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Sign-up failed" });
    }
}
//# sourceMappingURL=signupController.js.map