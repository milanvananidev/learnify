import { redis } from "./redis.js";

export const sendToken = async (user, statusCode, res) => {
    const accessToken = await user.signAccessToken();
    const refreshToken = await user.signRefreshToken();

    // for caching
    redis.set(user._id, JSON.stringify(user))

    const acessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || 5)
    const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || 3)

    const accessTokenOptions = {
        expires: new Date(Date.now() + acessTokenExpire * 60 * 60 * 1000),
        maxAge: acessTokenExpire * 1000 * 60 * 60,
        httpOnly: true,
        sameSite: 'lax'
    }

    const refreshTokenOptions = {
        expires: new Date(Date.now() + acessTokenExpire * 24 * 60 * 60 * 1000),
        maxAge: refreshTokenExpire * 1000 * 60 * 60 * 24,
        httpOnly: true,
        sameSite: 'lax'
    }

    if (process.env.NODE_ENV === 'production') {
        accessTokenOptions.secure = true
    }

    res.cookie("access_token", accessToken, accessTokenOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenOptions);

    res.status(statusCode).json({
        success: true,
        accessToken,
        user
    })
}   