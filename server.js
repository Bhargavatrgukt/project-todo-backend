import express from "express";
import bodyParser from "body-parser";
import projectRoutes from "./route/projectRoute.js";
import taskRoutes from "./route/taskRoutes.js";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/api", projectRoutes);
app.use("/api", taskRoutes);

app.get("/", (req, res) => res.send("This is a home page"));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
