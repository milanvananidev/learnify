import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './database/db.js';

const app = express();
dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());


app.listen(process.env.PORT, () => {
    console.log('Server is running on port', process.env.PORT, '🎉')
})