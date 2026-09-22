import { emailQueue } from "./email.queue.ts";

const jobs = Array.from({ length: 200 }, (_, index) => ({
  name: "send-otp",
  data: {
    email: `test${index + 1}@example.com`,
    otp: "123456",
    purpose: "LOGIN",
  },
  opts: {
    attempts: 3,
    backoff: {
      type: "exponential" as const,
      delay: 2000,
    },
  },
}));

const addedJobs = await emailQueue.addBulk(jobs);

console.log(`${addedJobs.length} jobs added successfully`);

await emailQueue.close();