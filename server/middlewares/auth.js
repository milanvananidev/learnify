import ErrorHandler from "../utils/error.js";
import jwt from 'jsonwebtoken';
import { redis } from "../utils/redis.js";

export const isAuthenticated = async (req, res, next) => {
    const access_token = req.cookies.access_token;

    if (!access_token) {
        return res.status(400).json({
            success: false,
            message: "Please login to access"
        })
    }
    const decoded = jwt.decode(access_token, process.env.ACCESS_TOKEN_SECRET);

    console.log(decoded)

    if (!decoded) {
        return res.status(400).json({
            success: false,
            message: "Access token is not valid"
        })
    }

    let user = await redis.get(decoded.id)

    if (!user) {
        return res.status(400).json({
            success: false,
            message: "User not found"
        })
    }

    req.user = JSON.parse(user);

    next();
}