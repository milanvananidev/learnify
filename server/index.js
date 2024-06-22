import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cloudinary from 'cloudinary';
import cookieParser from 'cookie-parser';
import { connectDB } from './database/db.js';
import { errorMiddleware } from './utils/error.js';

import userRouter from './routes/user.js';
import courseRouter from './routes/course.js';

const app = express();
dotenv.config();
connectDB();

app.use(cookieParser());
app.use(express.json());

console.log()

const origins = process.env.ORIGIN;

app.use(cors({
    origin: function (origin, callback) {
        if (origins.indexOf(origin) !== -1) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
    credentials: true
}));

// Storage service
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// All Routes
app.use('/api/v1/user', userRouter);
app.use('/api/v1/course', courseRouter);

app.get('/healthcheck', (req, res) => {
    res.send("<h1>Server is working 🎉</h1>")
})

app.all('*', (req, res) => {
    res.send("<h1> Not Found </h1>")
})

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT, '🎉')
})