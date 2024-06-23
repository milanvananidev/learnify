import UserModel from '../models/user.js';
import CourseModel from '../models/course.js';
import NotificationModel from '../models/notification.js';
import ErrorHandler from '../utils/error.js';
import { getAllOrders, newOrderService } from '../services/order.js';
import sendMail from '../utils/sendMail.js';

export const createOrder = async (req, res, next) => {
    try {

        const { courseId, paymentInfo } = req.body;

        const user = await UserModel.findById(req.user._id);

        const courseExists = user.courses.some((course) => course._id.toString() === courseId);

        if (courseExists) {
            next(new ErrorHandler("Already purchased", 400))
        };

        const course = await CourseModel.findById(courseId);

        if (!course) {
            next(new ErrorHandler("Course not found", 400))
        }

        const data = {
            courseId: course._id,
            userId: user._id,
            paymentInfo
        }

        const mailData = {
            order: {
                _id: course._id,
                name: course.name,
                price: course.price,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                accessPage: `${process.env.FRONTEND_URL}/course-access/${course._id}`
            }
        }

        try {
            sendMail({
                email: user.email,
                subject: 'Order Confirmation - Learnify',
                template: 'order-confirmation.ejs',
                data: mailData
            });
        } catch (error) {

        }

        user?.courses?.push(course._id);

        await user?.save();

        await NotificationModel.create({
            user: user?._id,
            title: 'New Order',
            message: `We have a new order for ${course.name} from ${user.firstName + ' ' + user.lastName}`
        });

        course.purchased ? course.purchased += 1 : course.purchased;

        await course.save();

        newOrderService(data, res, next);
    } catch (error) {
        console.log(error)
        next(new ErrorHandler("Internal server error", 500))
    }
}