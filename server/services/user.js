import UserModel from '../models/user.js';

export const getAllUsers = async (res) => {
    try {
        const users = await UserModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            users
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}