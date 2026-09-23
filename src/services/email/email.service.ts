import transport from "../../config/nodemailer.ts";
import env from "../../config/env.ts";
import logger from "../../config/logger.ts";
import type { EmailJobData } from "./email.types.ts";
import EmailError from "../../utils/emailError.ts";

class EmailService {
  async sendEmail({ to, subject, html, text }: EmailJobData): Promise<void> {
    try {
      await transport.sendMail({
        from: env.MAIL_FROM,
        to,
        subject,
        html,
        text,
      });

      logger.info("Email sent successfully", {
        to,
        subject,
      });
    } catch (error) {
      logger.error("Failed to send email", { to, subject, error: error });
      throw new EmailError("Failed to send email", error);
    }
  }
}



export const emailService = new EmailService();