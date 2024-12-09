import express from "express";
import { createProject } from "../controller/projectController.js";

const router = express.Router();

router.post("/projects", createProject);
// router.get("/projects", ProjectController.getProjects);

export default router;
