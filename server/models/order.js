import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    paymentInfo: {
        type: Object,
        // required: true
    }
}, {timestamps: true});

export default mongoose.model('orders', orderSchema);