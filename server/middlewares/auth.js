import ErrorHandler from "../utils/error.js";
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js'
import { redis } from "../utils/redis.js";

export const isAuthenticated = async (req, res, next) => {
    const { access_token } = req.cookies;

    if (!access_token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        const storedToken = await redis.get(decoded.id);

        if (!storedToken || storedToken !== access_token) {
            return res.status(401).json({ message: "Session expired or invalid" });
        }

        let user = await UserModel.findOne({ _id: decoded.id });
        req.user = user;
        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user?.role || '')) {
            return next(new ErrorHandler(`Role ${req.user?.role} is not allowed to access this.`))
        }

        next();
    }
}