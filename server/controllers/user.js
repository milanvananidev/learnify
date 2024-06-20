import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from 'cloudinary';
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
    const { login, password } = req.body;

    if (!login || !password) {
        return next(new ErrorHandler("Please enter email/username and password", 400));
    }

    // Find user by email or username
    const user = await UserModel.findOne({ $or: [{ email: login }, { userName: login }] }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid email/username or password", 400));
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid email/username or password", 400));
    }

    await sendToken(user, 200, res);
}

export const logoutUser = async (req, res, next) => {
    res.cookie("access_token", "", { maxAge: 1 })

    await redis.del(req.user._id)

    res.status(200).json({
        success: true,
        message: 'User logged out successfully'
    })
}

export const getUserInfo = async (req, res, next) => {
    try {
        const user = await UserModel.findOne({ _id: req.user._id });

        if (!user) {
            next(new ErrorHandler("User not found", 400))
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}

export const updateUserInfo = async (req, res, next) => {
    const { firstName, lastName } = req.body;
    const { email } = req.user;

    try {
        await UserModel.findOneAndUpdate({ email }, {
            firstName, lastName
        });

        return res.status(200).json({
            success: true,
            message: 'User updated succssfully'
        });
    } catch (error) {
        next(new ErrorHandler('Internal server error', 500));
    }
}

export const updateUserPassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await UserModel.findOne({ _id: req.user._id }).select("+password");

        const isPasswordMatch = await user.comparePassword(oldPassword);

        if (!isPasswordMatch) {
            return next(new ErrorHandler("Password did not match", 400))
        }

        user.password = newPassword;

        user.save();

        res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        console.log(error.message)
        next(new ErrorHandler('Internal server error', 500));
    }
}

export const updateUserAvatar = async (req, res, next) => {
    const { avatar } = req.body;
    const userId = req.user._id;

    const user = await UserModel.findOne({ _id: userId });

    if (avatar && user) {
        if (user?.avatar?.public_id) {
            await cloudinary.uploader.destroy(user?.avatar?.public_id);
        } 

        const cloud = await cloudinary.uploader.upload(avatar, {
            folder: 'users',
            width: 150
        });

        user.avatar = {
            public_id: cloud.public_id,
            url: cloud.secure_url
        }

        await user.save();

        return res.status(200).json({
            success: true,
            user
        })
    }
}