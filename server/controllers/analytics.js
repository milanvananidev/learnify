import { getLast12months } from '../utils/analytics.js'
import ErrorHandler from '../utils/error.js';
import UserModel from '../models/user.js';
import CourseModel from '../models/course.js';
import OrdersModel from '../models/order.js';

export const getUserAnalytics = async (req, res, next) => {
    try {
        const users = await getLast12months(UserModel);

        res.status(200).json({
            succes: true,
            users
        })
    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}

export const getCoursesAnalytics = async (req, res, next) => {
    try {
        const courses = await getLast12months(CourseModel);

        res.status(200).json({
            succes: true,
            courses
        })
    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}


export const getOrdersAnalytics = async (req, res, next) => {
    try {
        const orders = await getLast12months(OrdersModel);

        res.status(200).json({
            succes: true,
            orders
        })
    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}