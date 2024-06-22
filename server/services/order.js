import OrderModel from '../models/order.js';
import ErrorHandler from '../utils/error.js';

export const newOrderService = async (data, res, next) => {
    try {
        const order = await OrderModel.create(data);

        res.status(201).json({
            success: true,
            order
        })

    } catch (error) {
        next(new ErrorHandler("Internal server error when creteing order", 500))
    }
}