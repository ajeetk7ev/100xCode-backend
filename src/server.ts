import type { Server } from "node:http";
import { app } from "./app.ts";
import env from "./config/env.ts";
import logger from "./config/logger.ts";

const startServer = ():Server => {
  return app.listen(env.PORT, () => {
    logger.info(`Server is running on port ${env.PORT}`);
  });
};

const server = startServer();

process.on("uncaughtException", (error) => {
  logger.error("UNCAUGHT EXCEPTION:", error);
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (error) => {
  logger.error("UNHANDLED REJECTION:", error);
  server.close(() => {
    process.exit(1);
  });
});

//Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received. Shutting down gracefully...`);

  server.close(() => {
    logger.info("HTTP server closed.");

    process.exit(0);
  });
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
