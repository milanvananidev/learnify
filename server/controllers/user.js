import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';
import ErrorHandler from '../utils/error.js';
import sendMail from '../utils/sendMail.js';
import { sendToken } from '../utils/jwt.js';
import { redis } from '../utils/redis.js';

export const registerUser = async (req, res, next) => {

    const { firstName, lastName, userName, email, password } = req.body;

    if (!firstName || !lastName || !userName || !email || !password) {
        return next(new ErrorHandler('Please provide all user details to register', 409))
    };

    const isEmailExists = await UserModel.findOne({ email });
    const isUsernameExists = await UserModel.findOne({ userName });

    if (isEmailExists) {
        return next(new ErrorHandler("Email is already registred, please login", 409));
    }

    if (isUsernameExists) {
        return next(new ErrorHandler("Username is not available, please choose new username", 409));
    }

    const user = {
        firstName,
        lastName,
        userName,
        email,
        password
    }

    const activationToken = createActivationToken(user);
    const activationCode = activationToken.activationCode;

    const data = { user, activationCode };

    try {
        sendMail({
            email: email,
            subject: 'Activate your learnify account',
            template: 'activation-mail.ejs',
            data
        });

        res.status(200).json({
            success: true,
            message: `Please check your email: ${email} to activate your account.`,
            token: activationToken.token
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
};

export const activateUser = async (req, res, next) => {
    const { activation_token, activation_code } = req.body;

    try {
        const newUser = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET);

        if (newUser.activationCode !== activation_code) {
            return next(new ErrorHandler("Invalid activation code", 400))
        }

        const { firstName, lastName, userName, email, password } = newUser.user;

        const isUserExists = await UserModel.findOne({ email });
        const isUsernameExists = await UserModel.findOne({ userName });

        if (isUserExists) {
            return next(new ErrorHandler("Email already exists", 400))
        }

        if (isUsernameExists) {
            return next(new ErrorHandler("Username is not available, please choose new username", 409));
        }

        const user = await UserModel.create({ firstName, lastName, userName, email, password });
        user.password = undefined;

        res.status(201).json({
            success: true,
            user
        })

    } catch (error) {
        next(new ErrorHandler(error.message, 500))
    }
}

export const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign({ user, activationCode }, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' });
    return { token, activationCode };
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400))
    }

    const user = await UserModel.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email or password", 400))
    }

    sendToken(user, 200, res);
}

export const logoutUser = async (req, res, next) => {
    res.cookie("access_token", "", { maxAge: 1 })
    res.cookie("refresh_token", "", { maxAge: 1 })

    await redis.del(req.user._id)

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}