import { emailQueue } from "./email.queue.ts";

const job = await emailQueue.add("send-otp", {
  email: "test@example.com",
  otp: "123456",
  purpose:"LOGIN"
},
 {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 2000,
    },
  }
);

console.log("Job added:", job.id);


await emailQueue.close();