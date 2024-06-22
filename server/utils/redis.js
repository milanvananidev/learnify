import { config } from "dotenv";
import { Redis } from "ioredis";

config();

export const redis = new Redis(process.env.REDIS_URL)