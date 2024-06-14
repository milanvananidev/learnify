import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { connectDB } from './database/db.js';
import { errorMiddleware } from './utils/error.js';

import userRouter from './routes/user.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: process.env.ORIGIN
}));

// All Routes
app.use('/api/v1/user', userRouter);

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