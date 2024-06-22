import NotificationModel from '../models/notification.js';
import ErrorHandler from '../utils/error.js';
import cron from 'node-cron';

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

// delete read notification every day ( remove last 30 days )
cron.schedule("0 0 0 * * * ", async function () {
    const monthAgoDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await NotificationModel.deleteMany({ status: 'read', createdAt: { $lt: monthAgoDate } })
});