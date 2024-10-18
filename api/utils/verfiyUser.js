import { errorHandler } from "./error.js";
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return next(errorHandler(401, 'Access Denied'));

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) return next(errorHandler(403, 'Forbidden'));
        req.user = user;
        next();
    });
};