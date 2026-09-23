import dotenv from "dotenv";
dotenv.config();

const env = {
  PORT: process.env.PORT || 8000,
  DATABASE_URL:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@localhost:5432/100xcode",

  REDIS_HOST: process.env.REDIS_HOST || "localhost",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  REDIS_PASSWORD: process.env.REDIS_PASSWORD,
  REDIS_TLS: process.env.REDIS_TLS || false,
  
  MAIL_FROM:process.env.MAIL_FROM,
  MAIL_HOST:process.env.MAIL_HOST,
  MAIL_PORT:process.env.MAIL_PORT,
  SMTP_USER:process.env.MAIL_USER,
  SMTP_PASS: process.env.SMTP_PASS,

};

export default env;
