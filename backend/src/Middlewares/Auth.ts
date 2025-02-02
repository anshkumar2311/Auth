import e from 'express';
import jwt from 'jsonwebtoken';
const ensureAuth = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(403).json({ message: "Unauthorized, JWT token is require" });
    }
    try {
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Unauthorized, JWT token is expired" });
    }
};
export { ensureAuth };
