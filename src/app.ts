import express from "express";
import dotenv from "dotenv";
import errorHandler from "./middlewares/errorHandler.ts";
import notFoundHandler from "./middlewares/notFoundHandler.ts";
dotenv.config();
import authRoutes from "./routes/auth/auth.route.ts";
import "./workers/email.worker.ts"

const app = express();
app.use(express.json());

app.get("/health", (_, res) => {
  res.send({
    message: "Server is running fine",
    upTime: process.uptime(),
  });
});



app.use("/api/v1/auth", authRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export { app };
