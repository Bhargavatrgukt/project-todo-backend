import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import projectRoutes from "./route/projectRoute.js";
import taskRoutes from "./route/taskRoutes.js";
import commentRoutes from "./route/commetRoute.js";
import userRoutes from "./route/userRoute.js";

import logger from "./utility/logger.js";
import morgan from "morgan";

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(cookieParser());

const morganFormat = ":method :url :status :response-time ms";

app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const logObject = {
          method: message.split(" ")[0],
          url: message.split(" ")[1],
          status: message.split(" ")[2],
          responseTime: message.split(" ")[3],
        };
        logger.info(JSON.stringify(logObject));
      },
    },
  })
);

app.use("/app", projectRoutes);
app.use("/app", taskRoutes);

app.use("/app", commentRoutes);
app.use("/app", userRoutes);

app.use((err, req, res, next) => {
  console.error(err); // Log the error

  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: errorMessage });
});

// app.get("/", (req, res) => res.send("This is a home page"));

// Catch unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Optionally log or take further actions like sending alerts
  process.exit(1); // Optional: exit the process
});

// Catch uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception thrown:", error);
  // Optionally log or take further actions like sending alerts
  process.exit(1); // Optional: exit the process
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
