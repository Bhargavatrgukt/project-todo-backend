import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import projectRoutes from "./route/projectRoute.js";
import taskRoutes from "./route/taskRoutes.js";
import commentRoutes from "./route/commetRoute.js";

const app = express();

dotenv.config();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

app.use("/app", projectRoutes);
app.use("/app", taskRoutes);

app.use("/app", commentRoutes);

app.use((err, req, res, next) => {
  console.error(err); // Log the error

  const statusCode = err.status || 500;
  const errorMessage = err.message || "Internal Server Error";

  res.status(statusCode).json({ error: errorMessage });
});

// app.get("/", (req, res) => res.send("This is a home page"));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
