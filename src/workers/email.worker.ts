import { Worker, type Job } from "bullmq";
import { redis } from "../config/redis.ts";
import logger from "../config/logger.ts";

const emailWorker = new Worker(
  "email",
  async (job: Job) => {
    logger.info(`Processing job: ${job.id}`);

    if (job.name === "send-otp") {
      const { email, otp, purpose } = job.data;

      logger.info(`Sending OTP ${otp} to ${email} with purpose ${purpose}`);
      // Force failure for testing
      throw new Error("TEST: Email service failed");
      // await emailService.sendOtp(email, otp, purpose);
    }
  },
  {
    connection: redis,
    concurrency: 5,
  },
);

emailWorker.on("ready", () => {
  logger.info(`Email worker is  ready`);
});

emailWorker.on("completed", (job) => {
  logger.info(`Job ${job.id} completed`);
});

emailWorker.on("failed", (job, error) => {
  logger.error(`Job ${job?.id} failed: ${error.message}`);
});
