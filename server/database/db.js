import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName:'learnify'
    }).then(() => {
        console.log('MongoDB connected successfully')
    }).catch(() => {
        console.log('Error in database connection')
    });
}