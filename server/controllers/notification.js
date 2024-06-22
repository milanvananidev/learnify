import NotificationModel from '../models/notification.js';
import ErrorHandler from '../utils/error.js';

export const getNotifications = async (req, res, next) => {
    try {
        const notifications = await NotificationModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        })
    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
};

export const updateNotificationStatus = async (req, res, next) => {
    try {
        const notificationID = req.params.id;

        const notification = await NotificationModel.findById(notificationID);

        if (!notification) {
            return next(new ErrorHandler("Notification not found", 404))
        }

        notification.status = 'read';

        notification.save();

        const notifications = await NotificationModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            notifications
        })

    } catch (error) {
        next(new ErrorHandler("Internal server error", 500))
    }
}