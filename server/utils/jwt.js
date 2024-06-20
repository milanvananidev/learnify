import { redis } from "./redis.js";

export const sendToken = async (user, statusCode, res) => {
    const accessToken = await user.signAccessToken();

    await redis.set(user._id.toString(), accessToken, 'EX', parseInt(process.env.ACCESS_TOKEN_EXPIRE) * 24 * 60 * 60);

    const acessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || 3)

    const accessTokenOptions = {
        expires: new Date(Date.now() + acessTokenExpire - 24 * 60 * 60 * 1000),
        maxAge: acessTokenExpire * 24 * 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'lax'
    }

    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true
    }

    res.cookie("access_token", accessToken, accessTokenOptions);

    res.status(statusCode).json({
        success: true,
        accessToken,
        user
    })
}   