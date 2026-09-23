import { Worker, type Job } from "bullmq";
import { redis } from "../config/redis.ts";
import logger from "../config/logger.ts";
import { emailService } from "../services/email/email.service.ts";

const emailWorker = new Worker(
  "email",
  async (job: Job) => {
    logger.info(`Processing email job: ${job.id}`);

    await emailService.sendEmail(job.data);
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

emailWorker.on("failed", (job, error) => {
  logger.error("Email job failed", {
    jobId: job?.id,
    jobName: job?.name,
    attemptsMade: job?.attemptsMade,
    error: error.message,
  });
});
