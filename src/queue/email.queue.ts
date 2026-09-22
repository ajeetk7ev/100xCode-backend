import { Queue } from "bullmq";
import { redis } from "../config/redis.ts";


export const emailQueue = new Queue("email", {
    connection: redis
})