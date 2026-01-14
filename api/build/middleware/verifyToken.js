import jwt from "jsonwebtoken";
export function verifyToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
        return res.status(403).json({ error: "No token provided" });
    }
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }
    jwt.verify(token, process.env["JWT_SECRET"], (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Invalid token" });
        }
        req.user = user;
        next();
        return;
    });
    return;
}
//# sourceMappingURL=verifyToken.js.map