import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtUser } from "../types/express.js";
export function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).json({ error: "No token provided" });
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
    });
}
//# sourceMappingURL=verifyToken.js.map